const ACTION = require('./constants');
const customerHandler = require('./handlers/customer').handler;
const customerSettingHandler = require('./handlers/customerSetting').handler;
const subscriptionHandler = require('./handlers/subscription').handler;
const subscriptionCouponHandler = require('./handlers/subscriptionCoupon').handler;

module.exports.handler = async (event, context) => {
  console.log('=== event log ===', event);
  switch (event.action) {
    case ACTION.CUSTOMER_ROOT:
      return customerHandler(event, context);
    case ACTION.CUSTOMER_SETTING:
      return customerSettingHandler(event, context);
    case ACTION.CREATE_CUSTOMER:
      return subscriptionHandler(event, context);
    case ACTION.LIST_CUSTOMER:
      return subscriptionCouponHandler(event, context);
    default:
      return {};
  }
};
