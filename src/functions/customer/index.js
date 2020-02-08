// const metaHandler = require('./handlers/meta').handler;
// const ACTION = require('./constants');
// import { successResponse } from '../../utils';
const { successResponse } = require('../../utils');

module.exports.handler = async event => {
  // console.log(JSON.stringify(event, null, 2));
  // Consider action
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  return response;
};
