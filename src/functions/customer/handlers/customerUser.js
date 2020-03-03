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
        message: 'We are getting your requested customer user information!',
        input: event,
        // content: oneCustomer,
      });
      return response1;
    case 'POST':
      const result = await Customer.update(
        { title: req.body.title },
        { returning: true, where: { id: req.params.id } },
      );
      const response2 = successResponse({
        message: 'We are updating your requested customer user information!',
        input: event,
        content: result,
      });
      return response2;
    case 'DELETE':
      const isDeleted = await Customer.destroy({
        where: {
          id: customerId,
        },
      });
      const response3 = successResponse({
        message: 'We are deleting your requested customer user information!',
        input: event,
        content: isDeleted,
      });
      return response3;
    default:
      const generalResponse = successResponse({
        message: 'We are handling your requested customer user information!',
        input: event,
      });
      return generalResponse;
  }
};
