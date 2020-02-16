
const { addPromptToResponse } = require('./promptHelper');

const sendFailResponse = (data) => {
  console.log(data);
  throw data;
};

const sendWhisperResponse = ({
  propertyCode,
  whisperText,
}) => ({
  lambda_success: 1,
  propertyCode,
  whisperText,
});

const sendSuccessDNISResponse = ({
  dnis,
  whisperPrompt,
  xferAnnouncementPrompt,
  appAnnouncementPrompt,
  specialAnnouncementPrompt,
  specialHandlingHangup,
  dnisAnnouncementPrompt,
  specialHandlingRule,
  specialHandlingAppliedTo,
  application,
  startTimestamp,
}) => {
  const response = {
    lambda_success: 1,
  };

  response.dnis = dnis.ConnectDNIS.PhoneNumber;
  response.dnis_description = dnis.Description;
  response.dnis_language = dnis.Language && dnis.Language.Name;
  response.dnis_language_voice = dnis.Voice;
  response.dnis_contact_flow_tag = dnis.ContactFlowTag;
  response.dnis_intent_module_arn = dnis.ConnectContactFlow && dnis.ConnectContactFlow.ARN;
  response.dnis_incoming_module_arn = dnis.InboundContactFlow && dnis.InboundContactFlow.ARN;
  response.brand = (dnis.Brand && dnis.Brand.Code) || '';
  response.property = (dnis.Hotel && dnis.Hotel.Code) || '';
  response.screen_pop = dnis.ScreenPop;
  response.xfer_number = dnis.XferNumberLocal && dnis.XferNumberLocal.replace(/\+/g, '');
  response.xfer_number_country = dnis.XferNumberCountryCode && dnis.XferNumberCountryCode.replace(/\+/g, '');
  
  response.trapDoorFlag = dnis.TrapDoorFlag;

  response.app_name = application.Name;
  response.app_after_hours_override = application.LocationAfterHoursOverride;
  response.time_zone_name = application.TimeZoneName;

  response.special_handling_rule = specialHandlingRule || 'none';
  response.special_handling_hangup_yn = (specialHandlingHangup == true || specialHandlingHangup == false) && specialHandlingHangup ? 'Y' : 'N';
  response.special_handling_applied_to = specialHandlingAppliedTo;
  addPromptToResponse(response, 'xfer_announcement', xferAnnouncementPrompt);
  addPromptToResponse(response, 'whisper_prompt', whisperPrompt);
  addPromptToResponse(response, 'app_announcement', appAnnouncementPrompt);
  addPromptToResponse(response, 'dnis_announcement', dnisAnnouncementPrompt);
  addPromptToResponse(response, 'special_announcement', specialAnnouncementPrompt);
  // Normalization

  Object.keys(response).forEach((key) => {
    if (!response[key]) {
      response[key] = '';
    }
  });
  response.function_version = process.env.AWS_LAMBDA_FUNCTION_VERSION;
  response.duration = Date.now() - startTimestamp;
  console.log(JSON.stringify(response, null, 2));
  return response;
};
const sendSuccessResponseSQL = ({
  dnis,
  intent,
  queue,
  application,
  musicPrompt,
  whisperPrompt,
  xferAnnouncementPrompt,
  appAnnouncementPrompt,
  dnisAnnouncementPrompt,
  specialAnnouncementPrompt,
  specialQueueArn,
  specialHandlingHangup,
  specialHandlingRule,
  specialHandlingAppliedTo,
  queueAnnouncementPrompt,
  destAnnouncementPrompt,
  queueArn,
  timeZone,
  destinationName,
  currentDateTime,
  customerIntent,
  startTimestamp,
}) => {
  const response = {
    lambda_success: 1,
  };

  try {
    response.dnis = dnis.ConnectDNIS.PhoneNumber;
    response.dnis_language = dnis.Language && dnis.Language.Name;
    response.dnis_language_voice = dnis.Voice;
    response.dnis_contact_flow_tag = dnis.ContactFlowTag;
    response.dnis_intent_module_arn = dnis.ConnectContactFlow && dnis.ConnectContactFlow.ARN;
    response.dnis_incoming_module_arn = dnis.InboundContactFlow && dnis.InboundContactFlow.ARN;
    response.dnis_description = dnis.Description;
    response.brand = (dnis.Brand && dnis.Brand.Code) || '';
    response.property = (dnis.Hotel && dnis.Hotel.Code) || '';
    response.screen_pop = dnis.ScreenPop;
    response.xfer_number = dnis.XferNumberLocal && dnis.XferNumberLocal.replace(/\+/g, '');
    response.xfer_number_country = dnis.XferNumberCountryCode
      && dnis.XferNumberCountryCode.replace(/\+/g, '');

    response.trapDoorFlag = dnis.TrapDoorFlag;
    response.app_name = application.Name;

    console.log('Application:', JSON.stringify(application));
    response.app_after_hours_override = application.LocationAfterHoursOverride;
    response.time_zone_name = application.TimeZoneName;

    response.queue_arn = queueArn;

    response.queue_selection_rule = queue.SelectionRule;
    response.queue_selection_operator = queue.SelectionOperator;
    response.queue_selection_value = queue.SelectionValue;
    response.secondary_queue_arn = queue.SecondaryQueueArn;
    response.queue_description = queue.Description;
    response.callback_yn = queue.IsCallBack ? 'Y' : 'N';
    response.callback_wait_time = queue.ExpectedWaitTimeCallBack;
    response.voice_mail = queue.VoiceMailNumberLocal
      && queue.VoiceMailNumberLocal.replace(/\+/g, '');
    response.voice_mail_country = queue.VoiceMailNumberCountryCode
      && queue.VoiceMailNumberCountryCode.replace(/\+/g, '');
    response.after_hours_handling_rule = queue.AfterHoursHandling;

    response.special_handling_queue_arn = specialQueueArn; // Query IT
    response.special_handling_rule = specialHandlingRule || 'none';
    response.special_handling_hangup_yn = (specialHandlingHangup == true || specialHandlingHangup == false)
      && specialHandlingHangup
      ? 'Y'
      : 'N';
    response.special_handling_applied_to = specialHandlingAppliedTo;
    response.call_start_time_local = currentDateTime
      .tz(timeZone)
      .format('YYYY-MM-DDTHH:mm:ss');
    response.call_start_time_utc = currentDateTime.utc().format('YYYY-MM-DDTHH:mm:ss');
    response.intent_name = customerIntent;
    response.intent_rule = intent.Name;
    response.intent_priority = intent.Priority;

    response.route_rule_name = destinationName;
    response.dnis_intent_module_arn = dnis.ConnectContactFlow && dnis.ConnectContactFlow.ARN;

    addPromptToResponse(response, 'music', musicPrompt);
    addPromptToResponse(response, 'whisper', whisperPrompt);
    addPromptToResponse(response, 'queue_announcement', queueAnnouncementPrompt);
    addPromptToResponse(response, 'app_announcement', appAnnouncementPrompt);
    addPromptToResponse(response, 'dest_announcement', destAnnouncementPrompt);
    addPromptToResponse(response, 'xfer_announcement', xferAnnouncementPrompt);
    addPromptToResponse(response, 'special_announcement', specialAnnouncementPrompt);
    addPromptToResponse(response, 'dnis_annoucement', dnisAnnouncementPrompt);
    // Normalization

    Object.keys(response).forEach((key) => {
      if (!response[key]) {
        response[key] = '';
      }
    });
    response.function_version = process.env.AWS_LAMBDA_FUNCTION_VERSION;
    response.duration = Date.now() - startTimestamp;

    console.log(JSON.stringify(response, null, 2));
    return response;
  } catch (err) {
    console.log(err);
    return { lambda_success: 0 };
  }
};

module.exports = {
  sendFailResponse,
  sendSuccessResponseSQL,
  sendSuccessDNISResponse,
  sendWhisperResponse,
};
