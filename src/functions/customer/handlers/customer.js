const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are updating your requested customer information!',
    input: event,
  });

  return response;
};
