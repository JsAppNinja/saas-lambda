const { successResponse, InvalidResponse } = require('../../../utils/lambda-response');
const models = require('../../../models');

const Customer = models.customers;
const Subscription = models.subscriptions;
const CustomerUser = models.customer_users;
const Setting = models.settings;

module.exports.handler = async (event) => {
  const method = httpMethod;
  switch (method) {
    case 'GET':
      const { customerId } = event;
      // const oneCustomer = await Customer.findByPk(customerId);
      const response1 = successResponse({
        message: 'We are getting your requested customer users information!',
        input: event,
        // content: oneCustomer,
      });
      return response1;
    case 'PUT':
      const result = await Customer.post(
        { title: req.body.title },
        { returning: true, where: { id: req.params.id } },
      );
      const response2 = successResponse({
        message: 'We are updating your requested customer users information!',
        input: event,
        content: result,
      });
      return response2;
    default:
      const generalResponse = successResponse({
        message: 'We are handling your requested customer user information!',
        input: event,
      });
      return generalResponse;
  }
};
