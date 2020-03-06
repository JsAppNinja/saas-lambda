const UrlPattern = require('url-pattern');

const {
  successResponse,
  InvalidResponse,
} = require('../../../utils/lambda-response');
const models = require('../../../models');

const Organization = models.organizations;
const { Customer } = models;

module.exports.handler = async (event, eventRoute) => {
  const { path } = event;
  const { httpMethod } = event;

  const pattern = new UrlPattern(eventRoute);
  const endpointInfo = pattern.match(path);
  console.log(path, endpointInfo); // eslint-disable-line no-console
  const orgId = 2;

  let responseData;
  let response;

  switch (httpMethod) {
    case 'GET':
      responseData = await Customer.findAll({
        where: {
          organization: orgId,
        },
      });
      response = successResponse({
        message: `We are getting ${orgId} customer information!`,
        input: event,
        result: responseData,
      });
      return response;
    case 'PUT':
      responseData = Customer.create({
        customer_name: 'New Customer',
        organization: orgId,
        chargebee_customer_id: 354,
        path: '1/2/3',
      });
      response = successResponse({
        message: 'We have updated your requested customer information!',
        input: event,
        result: responseData,
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
