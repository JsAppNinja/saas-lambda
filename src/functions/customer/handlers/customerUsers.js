const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are fethcing the customer users information from the database!',
    input: event,
  });

  return response;
};
