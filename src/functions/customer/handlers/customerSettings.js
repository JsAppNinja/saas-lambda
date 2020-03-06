const UrlPattern = require('url-pattern');

const {
  successResponse,
  InvalidResponse,
} = require('../../../utils/lambda-response');
const models = require('../../../models');

const Customer = models.customers;
const Subscription = models.subscriptions;
const CustomerUser = models.customer_users;
const Setting = models.settings;

module.exports.handler = async (event, eventRoute) => {
  const { path, httpMethod } = event;

  const pattern = new UrlPattern(eventRoute);
  const endpointInfo = pattern.match(path);
  console.log(path, endpointInfo); // eslint-disable-line no-console
  const customerId = 2;

  let responseData, customerData;
  let response;

  switch (httpMethod) {
    case 'GET':
      customerData = await Customer.findByPk(customerId);
      if (customerData && customerData.settings) {
        responseData = await Setting.findByPk(customerData.settings);
        response = successResponse({
          message: 'We are getting your requested organization information!',
          input: event,
          content: responseData,
        });
        return response;
      } else {
        response = InvalidResponse({
          message: `We couldn't find appropriate data`,
          input: event,
        });
        return response;
      }
    case 'PUT':
      responseData = await Setting.create({
        code: 'first_name',
        value: 'Dominic',
        type: 'string',
        regex: `/^.{6,}$/`,
      });
      response = successResponse({
        message: 'We have created a new setting information!',
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
