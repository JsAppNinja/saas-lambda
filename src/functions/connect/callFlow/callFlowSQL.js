
console.log('Function is loading');
const moment = require('moment-timezone');
const { checkSyntax, validateSyntax } = require('../../../utils/intentParser');
const {
  sendFailResponse, sendSuccessResponseSQL, sendSuccessDNISResponse, sendWhisperResponse,
} = require('../../../utils/response');
const { tables } = require('../../../utils/error/errorMessages');
const getKey = require('./filterItemsGetKeySQL');
const { getSpecialHandling, getSpecialHandlingId } = require('./getSpecialHandling');
const { checkQueue } = require('./queueSQL');

const ROUTING_METHODS = {
  DirectToQueue: 'DirectToQueue',
  PercentAllocation: 'PercentAllocation',
};
const getPrompt = ({ id, text, ssml }) => {
  const { Prompt, ConnectPrompt, Language } = require('../../../models');

  if (id) {
    return Prompt.findById(id, {
      include: [
        { model: ConnectPrompt, as: 'ConnectPrompt', attributes: ['ARN'] },
        { model: Language, as: 'Language', attributes: ['Name'] },
      ],
    });
  } if (text) {
    return Promise.resolve({
      SSML: `<speak>${text}</speak>`,
    });
  } if (ssml) {
    return Promise.resolve({
      SSML: ssml,
    });
  }
  return Promise.resolve({});
};

const processEvent = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event, null, 2));
  try {
    const {
      dialed_number, customer_intent, caller_id, current_date_time, whisper_key, type,
    } = event.Details.Parameters;
    let currentDateTime;
    if (!current_date_time) {
      console.log('Using current timestamp to pass operating hours');
      currentDateTime = moment.utc();
      console.log(currentDateTime.format());
    } else {
      console.log('Using timestamp from parameters to pass operating hours');
      currentDateTime = moment.utc(current_date_time);
      console.log(currentDateTime.format());
    }

    if (/^ping$/i.test(customer_intent)) {
      return { status: true };
    }
    if (customer_intent === 'getWhisper') {
      const { WhisperText } = require('../../../models');
      const whisperItem = await WhisperText.findOne({
        where: {
          Type: type,
          WhisperKey: whisper_key,
        },
      });
      console.log('WhisperItem:', JSON.stringify(whisperItem, null, 2));
      if (whisperItem) {
        return sendWhisperResponse({
          propertyCode: whisperItem.PropertyCode,
          whisperText: whisperItem.WhisperText,
        });
      }
      return sendFailResponse(tables.WHISPER_ERROR);
    }
    const {
      Application,
      AllocationGroupSpecialHandling,
      Destination,
      DNIS,
      Intent,
      Brand,
      Hotel,
      ConnectDNIS,
      Language,
      ConnectQueue,
      ConnectContactFlow,
      SpecialHandling,
    } = require('../../../models');


    const dnis = await DNIS.findOne({
      include: [
        { model: Brand, as: 'Brand', attributes: ['Name', 'Code'] },
        { model: Hotel, as: 'Hotel', attributes: ['Name', 'Code'] },
        {
          model: ConnectDNIS, as: 'ConnectDNIS', where: { PhoneNumber: dialed_number }, attributes: ['PhoneNumber'],
        },
        { model: ConnectContactFlow, as: 'ConnectContactFlow' },
        { model: ConnectContactFlow, as: 'InboundContactFlow' },
        { model: Language, as: 'Language' },
      ],
    });

    if (!dnis) {
      return sendFailResponse(tables.DNIS_ERROR);
    }

    console.log(dnis.toJSON());
    const applicationItem = await Application.findById(dnis.ApplicationId);

    if (!applicationItem) {
      return sendFailResponse(tables.LOCATION_ERROR);
    }

    const applicationId = applicationItem.Id;
    const timeZone = applicationItem.TimeZoneName;

    if (customer_intent === 'getDNIS') {
      // Get SpecialHandlings
      const specialHandlings = [];
      console.log('SpecialHandings', specialHandlings);
      const callSpecialHandling = await getSpecialHandling({
        dnisId: dnis.Id, callerId: caller_id, applicationId, timeZone, currentDateTime,
      });
      const specialHandlingRule = callSpecialHandling && callSpecialHandling.Rule;
      const specialHandlingHangup = callSpecialHandling && callSpecialHandling.Hangup;
      const specialAnnouncementPromptId = callSpecialHandling && callSpecialHandling.AnnouncementPromptId;
      const specialHandlingAppliedTo = callSpecialHandling && callSpecialHandling.AppliedTo;
      let whisperPrompt; let xferAnnouncementPrompt; let appAnnouncementPrompt; let specialAnnouncementPrompt; let
        dnisAnnouncementPrompt;

      const whisperPromptId = dnis.WhisperPromptId;
      const xferAnnouncementPromptId = dnis.XferAnnouncementPromptId;
      const dnisAnnouncementPromptId = dnis.AnnouncementPromptId;

      const promises = [
        getPrompt({ id: whisperPromptId, text: dnis.WhisperText, ssml: dnis.WhisperSSML }).then((prompt) => whisperPrompt = prompt),
        getPrompt({ id: xferAnnouncementPromptId }).then((prompt) => xferAnnouncementPrompt = prompt),
        getPrompt({ id: dnisAnnouncementPromptId }).then((prompt) => dnisAnnouncementPrompt = prompt),
        getPrompt({ id: applicationItem.AnnouncementPromptId }).then((prompt) => appAnnouncementPrompt = prompt),
        getPrompt({ id: specialAnnouncementPromptId }).then((prompt) => specialAnnouncementPrompt = prompt),
      ];
      await Promise.all(promises);


      // Add whisper language
      whisperPrompt.Language = dnis.Language;
      return sendSuccessDNISResponse({
        dnis,
        application: applicationItem,
        whisperPrompt,
        xferAnnouncementPrompt,
        appAnnouncementPrompt,
        dnisAnnouncementPrompt,
        specialAnnouncementPrompt,
        specialHandlingRule,
        specialHandlingHangup,
        specialHandlingAppliedTo,
        customer_intent,
        startTimestamp: event.startTimestamp,
      });
    }

    let intent;
    const defaultIntent = await Intent.findOne({ where: { Name: '*', ApplicationId: applicationItem.Id } });
    // let intent = await Intent.findOne({where: {Name: customer_intent, ApplicationId: applicationItem.Id}});
    const intents = await Intent.findAll({ where: { ApplicationId: applicationItem.Id } });
    const possibleIntents = [];
    for (let i = 0; i < intents.length; i++) {
      const intent = intents[i];
      const possibility = (validateSyntax(intent.Name, intent.Pattern)) && (checkSyntax(intent.Name, intent.Pattern, customer_intent));
      console.log(intent.Name, intent.Pattern, customer_intent, possibility);
      if (possibility) {
        possibleIntents.push(intent);
      }
    }

    const intentIds = possibleIntents.map((_) => _.Id);
    let destItems = await Destination.findAll({
      where: {
        CallRoutingTypeId: dnis.CallRoutingTypeId,
        ApplicationId: dnis.ApplicationId,
        IntentId: intentIds,
      },
    });

    if (destItems.length === 0) {
      // Try * Intent
      intent = defaultIntent;
      destItems = await Destination.findAll({
        where: {
          CallRoutingTypeId: dnis.CallRoutingTypeId,
          ApplicationId: dnis.ApplicationId,
          IntentId: intent.Id,
        },
      });
      if (destItems.length === 0) {
        return sendFailResponse(tables.DESTINATION_ERROR);
      }
    }

    const destination = await getKey(destItems, timeZone, currentDateTime);
    if (!destination) {
      return sendFailResponse(tables.KEY_ERROR);
    }
    // Get Intent
    intent = intents.find((_) => _.Id === destination.IntentId);
    let whisperPromptId;
    let xferAnnouncementPromptId;
    let specialHandlingRule;
    let specialHandlingHangup;
    let specialConnectQueueId;
    let specialAnnouncementPromptId;
    let specialHandlingAppliedTo;
    let specialQueueArn;
    let musicPrompt;
    let whisperPrompt;
    let queueAnnouncementPrompt;
    let xferAnnouncementPrompt;
    let appAnnouncementPrompt;
    let destAnnouncementPrompt;
    let specialAnnouncementPrompt;
    let dnisAnnouncementPrompt;
    let queueArn;
    let callSpecialHandling;

    let allocationGroupShApplied = false;
    // Get special handling for allocation group
    if (destination.AllocationGroupId && destination.RoutingMethod === ROUTING_METHODS.PercentAllocation) {
      const allocationGroupShs = await AllocationGroupSpecialHandling.findAll({
        where: {
          AllocationGroupId: destination.AllocationGroupId,
        },
        include: [
          {
            model: SpecialHandling,
            as: 'SpecialHandling',
            where: {
              RuleEnabled: true,
            },
          },
        ],
      });
      const allocationGroupShId = getSpecialHandlingId(allocationGroupShs.map((_) => _.SpecialHandling), applicationItem.TimeZoneName, currentDateTime);
      console.log('AllocationGroupSpecialHandling:', allocationGroupShId);
      const allocationGroupSh = allocationGroupShs.map((_) => _.SpecialHandling).find((_) => _.Id === allocationGroupShId);
      console.log('AllocationGroupSH found:', JSON.stringify(allocationGroupSh, null, 2));
      if (allocationGroupSh && allocationGroupSh.AllocationGroupId && allocationGroupSh.Rule === 'allocation_group') {
        destination.AllocationGroupId = allocationGroupSh.AllocationGroupId;
        allocationGroupShApplied = true;
      }
    }
    const queue = await checkQueue({
      routingMethod: destination.RoutingMethod,
      allocationGroupId: destination.AllocationGroupId,
      queueSelectionRuleId: destination.QueueSelectionRuleId,
      queueId: destination.QueueId,
      callRoutingTypeId: destination.CallRoutingTypeId,
      callerId: caller_id,
      applicationId: applicationItem.Id,
      timeZone: applicationItem.TimeZoneName,
    });

    if (!queue) {
      return sendFailResponse(tables.QUEUE_ERROR);
    }

    callSpecialHandling = await getSpecialHandling({
      callerId: caller_id, queueId: queue.Id, dnisId: dnis.Id, applicationId, timeZone, currentDateTime,
    });

    console.log('SpecialHandling:', JSON.stringify(callSpecialHandling, null, 2));

    queueArn = queue.ConnectQueue.ARN;

    // const language = queue.Language;


    whisperPromptId = callSpecialHandling && callSpecialHandling.WhisperPromptId || dnis.WhisperPromptId;
    xferAnnouncementPromptId = callSpecialHandling && callSpecialHandling.XferAnnouncementPromptId || dnis.XferAnnouncementPromptId;
    specialHandlingRule = callSpecialHandling && callSpecialHandling.Rule;
    specialHandlingHangup = callSpecialHandling && callSpecialHandling.Hangup;
    specialConnectQueueId = callSpecialHandling && callSpecialHandling.ConnectQueueId;
    specialAnnouncementPromptId = callSpecialHandling && callSpecialHandling.AnnouncementPromptId;
    specialHandlingAppliedTo = callSpecialHandling && callSpecialHandling.AppliedTo;

    if (allocationGroupShApplied) {
      specialHandlingAppliedTo += specialHandlingAppliedTo ? ',allocation_group' : 'allocation_group';
    }

    const promises = [
      getPrompt({ id: queue.MusicPromptId }).then((prompt) => musicPrompt = prompt),
      getPrompt({ id: whisperPromptId, text: dnis.WhisperText, ssml: dnis.WhisperSSML }).then((prompt) => whisperPrompt = prompt),
      getPrompt({ id: queue.AnnouncementPromptId }).then((prompt) => queueAnnouncementPrompt = prompt),
      getPrompt({ id: dnis.AnnouncementPromptId }).then((prompt) => dnisAnnouncementPrompt = prompt),
      getPrompt({ id: xferAnnouncementPromptId }).then((prompt) => xferAnnouncementPrompt = prompt),
      getPrompt({ id: applicationItem.AnnouncementPromptId }).then((prompt) => appAnnouncementPrompt = prompt),
      getPrompt({ id: specialAnnouncementPromptId }).then((prompt) => specialAnnouncementPrompt = prompt),
      getPrompt({ id: destination.AnnouncementPromptId }).then((prompt) => destAnnouncementPrompt = prompt),
    ];
    if (specialConnectQueueId) {
      promises.push(ConnectQueue.findById(specialConnectQueueId).then((res) => specialQueueArn = res.ARN));
    }

    await Promise.all(promises)
      .then((res) => console.log(JSON.stringify(res)))
      .catch((err) => console.log(err));

    dnis.XferNumberLocal = callSpecialHandling && callSpecialHandling.XferNumberLocal || dnis.XferNumberLocal;
    dnis.XferNumberCountryCode = callSpecialHandling && callSpecialHandling.XferNumberCountryCode || dnis.XferNumberCountryCode;

    dnis.TrapDoorFlag = callSpecialHandling && callSpecialHandling.TrapDoorFlag || dnis.TrapDoorFlag;

    // Log prompts

    console.log('MusicPrompt:', JSON.stringify(musicPrompt, null, 2));
    console.log('WhisperPrompt:', JSON.stringify(whisperPrompt, null, 2));
    console.log('QueueAnnouncementPrompt:', JSON.stringify(queueAnnouncementPrompt, null, 2));
    console.log('AppAnnouncementPrompt:', JSON.stringify(appAnnouncementPrompt, null, 2));
    console.log('XferAnnouncementPrompt:', JSON.stringify(xferAnnouncementPrompt, null, 2));
    console.log('DestAnnouncementPrompt:', JSON.stringify(destAnnouncementPrompt, null, 2));

    whisperPrompt.Language = whisperPrompt.Language || dnis.Language;
    return sendSuccessResponseSQL({
      musicPrompt,
      whisperPrompt,
      queueAnnouncementPrompt,
      destAnnouncementPrompt,
      xferAnnouncementPrompt,
      appAnnouncementPrompt,
      dnisAnnouncementPrompt,
      queueArn,
      specialAnnouncementPrompt,
      specialQueueArn,
      specialHandlingRule,
      specialHandlingHangup,
      specialHandlingAppliedTo,
      routingMethod: destination.RoutingMethod,
      timeZone: applicationItem.TimeZoneName,
      dnis,
      queue,
      application: applicationItem,
      intent,
      // language: language,
      destinationName: destination.Name,
      currentDateTime,
      customerIntent: customer_intent,
      startTimestamp: event.startTimestamp,
    });
  } catch (err) {
    console.log(err);
    if (err.errorMessage) {
      return sendFailResponse(err);
    }
    return sendFailResponse({ errorMessage: err.message });
  }
};

module.exports.handler = require('../../../library/lambdaHelper')(processEvent);
