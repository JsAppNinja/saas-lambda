// const metaHandler = require('./handlers/meta').handler;
const createCustomer = require('./handlers/createCustomer').handler;
const listCustomer = require('./handlers/listCustomer').handler;
const ACTION = require('./constants');

module.exports.handler = async (event, context) => {
  // Action Code Definition
  switch (event.action) {
    case ACTION.SYNC_META:
      // return metaHandler(event, context);
      return {};
    case ACTION.CREATE_CUSTOMER:
      return createCustomer(event, context);
    case ACTION.LIST_CUSTOMER:
      return listCustomer(event, context);
    default:
      return {};
  }
};
