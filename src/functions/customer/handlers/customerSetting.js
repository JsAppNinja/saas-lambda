const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are updating one setting info for your requested customer!',
    input: event,
  });

  return response;
};
