const { successResponse } = require('../utils/lambda-response');
const customerModuleHandler = require('./customer').handler;

module.exports.handler = async (event, context) => customerModuleHandler(event, context);
