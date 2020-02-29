const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async event => {
  const response = successResponse({
    message: 'We are fetching one customer user setting information!',
    input: event,
  });

  return response;
};
