const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are updating the total subscription information for your requested customer!',
    input: event,
  });

  return response;
};
