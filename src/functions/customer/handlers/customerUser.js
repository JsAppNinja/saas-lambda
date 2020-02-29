const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are fetching the customer User information from the database!',
    input: event,
  });

  return response;
};
