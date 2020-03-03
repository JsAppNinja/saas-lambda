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
const Organization = models.organizations;

module.exports.handler = async (event, eventRoute) => {
  const { path } = event;
  const { httpMethod } = event;

  const pattern = new UrlPattern(eventRoute);
  const endpointInfo = pattern.match(path);
  console.log(endpointInfo); // eslint-disable-line no-console

  switch (httpMethod) {
    case 'GET':
      const response1 = successResponse({
        message: 'We are getting your requested customer information!',
        input: event,
        // content: oneCustomer,
      });
      return response1;
    case 'PUT':
      const result = await Customer.update(
        { title: req.body.title },
        { returning: true, where: { id: req.params.id } }
      );
      const response2 = successResponse({
        message: 'We are updating your requested customer information!',
        input: event,
        content: result,
      });
      return response2;
    default:
      const generalResponse = successResponse({
        message: 'We are handling your requested customer information!',
        input: event,
      });
      return generalResponse;
  }
};
