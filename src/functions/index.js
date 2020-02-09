const { successResponse } = require('../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'Your API request has excuted successfully!',
    input: event,
  });

  return response;
};
