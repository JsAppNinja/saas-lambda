
const moment = require('moment-timezone');
const { Op } = require('sequelize');

const getSpecialHandlingId = (specialHandlings, timeZone, currentDateTime) => {
  let callSpecialHandlingId;
  for (let i = 0; i < specialHandlings.length; i++) {
    const specialHandling = specialHandlings[i];
    if (!specialHandling.StartTime && !specialHandling.EndTime) {
      callSpecialHandlingId = specialHandling.Id;
      break;
    }
    // Check if call is in specialHandling hours
    const startDate = moment.tz(specialHandling.StartTime, timeZone);
    const endDate = moment.tz(specialHandling.EndTime, timeZone);
    if (startDate.isBefore(currentDateTime) && currentDateTime.isBefore(endDate)) {
      callSpecialHandlingId = specialHandling.Id;
      break;
    }
  }

  return callSpecialHandlingId;
};

const getSpecialHandling = async ({
  queueId, dnisId, callerId, applicationId, timeZone, currentDateTime,
}) => {
  const promises = [];
  const {
    ANI,
    ANISpecialHandling,
    QueueSpecialHandling,
    DNISSpecialHandling,
    SpecialHandling,
  } = require('../../../models');

  console.log({
    queueId, dnisId, callerId, applicationId, timeZone,
  });
  let specialHandlingRule;
  let specialHandlingHangup;
  let specialConnectQueueId;
  let specialAnnouncementPromptId;
  let specialXferNumberCountryCode;
  let specialXferNumberLocal;
  let specialWhisperPromptId;

  const specialHandlingAppliedTo = [];
  let specialNumberSet = false;

  const applySpecialHandling = (specialHandling, type) => {
    if (specialHandling) {
      specialHandlingRule = (specialHandlingRule == undefined) ? specialHandling.Rule : undefined;
      specialHandlingHangup = specialHandlingHangup || specialHandling.Hangup;
      specialConnectQueueId = specialConnectQueueId || specialHandling.ConnectQueueId;
      specialAnnouncementPromptId = specialAnnouncementPromptId || specialHandling.AnnouncementPromptId;
      specialWhisperPromptId = specialWhisperPromptId || specialHandling.WhisperPromptId;
      if (!specialNumberSet && ((specialHandling.XferNumberCountryCode || '') + (specialHandling.XferNumberLocal || '')) != '0') {
        specialNumberSet = true;
        specialXferNumberCountryCode = specialHandling.XferNumberCountryCode;
        specialXferNumberLocal = specialHandling.XferNumberLocal;
      }
      specialHandlingAppliedTo.push(type);
    }
  };
  if (callerId) {
    promises.push(ANISpecialHandling.findAll({
      where: {
        ApplicationId: {
          [Op.or]: [
            {
              [Op.eq]: applicationId,
            },
            {
              [Op.eq]: null,
            },
          ],
        },
      },
      include: [
        {
          model: ANI,
          as: 'ANI',
          where: {
            CallerId: callerId,
          },
        },
        {
          model: SpecialHandling,
          as: 'SpecialHandling',
          where: {
            RuleEnabled: true,
          },
          attributes: ['Id', 'StartTime', 'EndTime'],
        },
      ],
    }));
  } else {
    promises.push(Promise.resolve([]));
  }


  /**
   * Get Queue special handling
   */

  // Get special handling for queue
  if (queueId) {
    promises.push(QueueSpecialHandling.findAll({
      where: {
        QueueId: queueId,
        ApplicationId: applicationId,
      },
      include: [
        {
          model: SpecialHandling,
          as: 'SpecialHandling',
          where: {
            RuleEnabled: true,
          },
          attributes: ['Id', 'StartTime', 'EndTime'],
        },
      ],
      order: [['Priority', 'ASC']],
    }));
  } else {
    promises.push(Promise.resolve([]));
  }

  /**
   * Get DNIS special handling
   */

  // Get special handling for dnis
  if (dnisId) {
    promises.push(DNISSpecialHandling.findAll({
      where: {
        DNISId: dnisId,
        ApplicationId: applicationId,
      },
      include: [
        {
          model: SpecialHandling,
          as: 'SpecialHandling',
          where: {
            RuleEnabled: true,
          },
          attributes: ['Id', 'StartTime', 'EndTime'],
        },
      ],
    }));
  } else {
    promises.push(Promise.resolve([]));
  }

  const [aniSpecialHandlings, queueSpecialHandlings, dnisSpecialHandlings] = await Promise.all(promises);
  const queueSpecialHandlingId = getSpecialHandlingId(queueSpecialHandlings.map((queueSh) => queueSh.SpecialHandling), timeZone, currentDateTime);
  const aniSpecialHandlingId = getSpecialHandlingId(aniSpecialHandlings.map((aniSh) => aniSh.SpecialHandling), timeZone, currentDateTime);
  const dnisSpecialHandlingId = getSpecialHandlingId(dnisSpecialHandlings.map((dnisSh) => dnisSh.SpecialHandling), timeZone, currentDateTime);

  const [aniSpecialHandling, dnisSpecialHandling, queueSpecialHandling] = await Promise.all([aniSpecialHandlingId, dnisSpecialHandlingId, queueSpecialHandlingId].map((id) => id && SpecialHandling.findById(id) || Promise.resolve()));

  applySpecialHandling(aniSpecialHandling, 'ani');
  applySpecialHandling(dnisSpecialHandling, 'dnis');
  applySpecialHandling(queueSpecialHandling, 'queue');

  return {
    WhisperPromptId: specialWhisperPromptId,
    AnnouncementPromptId: specialAnnouncementPromptId,
    ConnectQueueId: specialConnectQueueId,
    Hangup: specialHandlingHangup,
    Rule: specialHandlingRule,
    XferNumberCountryCode: specialXferNumberCountryCode,
    XferNumberLocal: specialXferNumberLocal,
    AppliedTo: specialHandlingAppliedTo.join(','),
  };
};

module.exports = {
  getSpecialHandling,
  getSpecialHandlingId,
};
