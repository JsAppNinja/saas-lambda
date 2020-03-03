const { successResponse } = require('../../../utils/lambda-response');

module.exports.handler = async (event) => {
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  return response;
};
