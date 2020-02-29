const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are fetching all customers information!',
    input: event,
  });

  return response;
};
