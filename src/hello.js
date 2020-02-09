// import { successResponse, runWarm } from './utils';
const { successResponse } = require('./utils');

exports.handler = async event => {
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  return response;
};
