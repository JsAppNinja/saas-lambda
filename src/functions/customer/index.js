const { successResponse } = require('../../utils/lambda-response');

exports.handler = async event => {
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  return response;
};
