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

  let responseData;
  let response;

  switch (httpMethod) {
    case 'GET':
      responseData = await Customer.findByPk(customerId);
      response = successResponse({
        message: `We are getting ${customerId} customer information!`,
        input: event,
        result: responseData,
      });
      return response;
    case 'POST':
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
    case 'DELETE':
      responseData = await Customer.destroy({
        where: {
          id: customerId,
        },
      });
      response = successResponse({
        message: 'We have deleted your requested customer information!',
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
