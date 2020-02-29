const { sendFailResponse } = require('../../../utils/response');
const { tables } = require('../../../utils/error/errorMessages');

const { getPrompt, addPromptToResponse } = require('../../../utils/promptHelper');

const processEvent = async (event, context) => {
  const { DNIS, ConnectDNIS } = require('../../../models');
  context.callbackWaitsForEmptyEventLoop = false;

  const { dialed_number, start_timestamp } = event.Details.Parameters;

  let startDate;
  if (start_timestamp) {
    startDate = new Date(start_timestamp);
    console.log(startDate); // eslint-disable-line no-console
  } else {
    startDate = new Date();
  }
  try {
    const dnisItem = await DNIS.findOne({
      include: [
        {
          model: ConnectDNIS,
          as: 'ConnectDNIS',
          where: {
            PhoneNumber: dialed_number,
          },
          attributes: ['PhoneNumber'],
        },
      ],
      attributes: ['TrapDoorFlag', 'TrapDoorAnnouncementPromptId', 'TrapDoorThreshold'],
    });

    if (!dnisItem) {
      console.log('No DNIS'); // eslint-disable-line no-console
      return sendFailResponse(tables.DNIS_ERROR);
    }
    console.log(JSON.stringify(dnisItem)); // eslint-disable-line no-console

    const trapDoorFlag = dnisItem.TrapDoorFlag;

    if (trapDoorFlag) {
      const timeDiff = Date.now() - startDate.getTime();
      console.log('Time difference', timeDiff); // eslint-disable-line no-console
      if (timeDiff > dnisItem.TrapDoorThreshold * 1000) {
        const response = {
          lambda_success: 1,
          trap_door_flag: 'Y',
        };
        const trapDoorAnnouncementPrompt = await getPrompt({ id: dnisItem.TrapDoorAnnouncementPromptId });
        console.log(JSON.stringify(trapDoorAnnouncementPrompt, null, 2)); // eslint-disable-line no-console
        addPromptToResponse(response, 'trap_door_announcement', trapDoorAnnouncementPrompt);

        // Normalize response
        Object.keys(response).forEach((key) => response[key] = response[key] || '');
        return response;
      }
    }
    return ({
      lambda_success: 1,
      trap_door_flag: 'N',
    });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    throw err;
  }
};

module.exports.handler = require('../../../utils/lambdaHelper')(processEvent);
