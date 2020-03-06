const UrlPattern = require('url-pattern');

const {
  successResponse,
  InvalidResponse,
} = require('../../../utils/lambda-response');
const models = require('../../../models');

const Organization = models.organizations;
const Customer = models.customers;

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
      responseData = await Customer.create({
        customer_name: 'new Customer',
        organization: null,
        chargebee_customer_id: 281,
        subscription: 2,
        settings: 3,
        path: '1/2',
      });
      response = successResponse({
        message: 'We have created new customer information!',
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
