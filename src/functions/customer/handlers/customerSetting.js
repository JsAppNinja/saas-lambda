const UrlPattern = require('url-pattern');

const {
  successResponse,
  InvalidResponse,
} = require('../../../utils/lambda-response');
const models = require('../../../models');

const Customer = models.customers;
const Setting = models.settings;

module.exports.handler = async (event, eventRoute) => {
  const { path, httpMethod } = event;

  const pattern = new UrlPattern(eventRoute);
  const endpointInfo = pattern.match(path);
  console.log(path, endpointInfo); // eslint-disable-line no-console
  const customerId = 2;
  const settingId = 2;
  let responseData;
  let response;

  switch (httpMethod) {
    case 'GET':
      responseData = await Setting.findByPk(settingId);
      response = successResponse({
        message: `We are getting ${customerId} setting information!`,
        input: event,
        result: responseData,
      });
      return response;
    case 'POST':
      responseData = await Organization.update(
        {
          code: 'first_name',
          value: 'Dominic',
          type: 'string',
          regex: `/^.{6,}$/`,
        },
        {
          where: {
            id: settingId,
          },
        }
      );
      response = successResponse({
        message: 'We have created new setting information!',
        input: event,
        result: responseData,
      });
      return response;
    case 'DELETE':
      responseData = await Setting.destroy({
        where: {
          id: settingId,
        },
      });
      await Customer.update(
        {
          settings: null,
        },
        {
          where: {
            id: customerId,
          },
        }
      );
      response = successResponse({
        message: 'We have deleted your requested setting information!',
        input: event,
        content: responseData,
      });
      return response;
    default:
      response = InvalidResponse({
        message: 'We can not handle your request!',
        input: event,
      });
      return response;
  }
};
