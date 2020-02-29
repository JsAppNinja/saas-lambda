const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are fetching the customer user settings information!',
    input: event,
  });

  return response;
};
