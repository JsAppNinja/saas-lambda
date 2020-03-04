const { successResponse } = require('../utils/lambda-response');
const organizationModuleHandler = require('./organization').handler;

module.exports.handler = async (event, context) =>
  organizationModuleHandler(event, context);
