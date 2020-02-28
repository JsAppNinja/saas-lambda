const UrlPattern = require('url-pattern');

const ACTION = require('./constants');
const ROUTES = require('./routes');

const { successResponse } = require('../../utils/lambda-response');

const customerHandler = require('./handlers/customer').handler;
const customersHandler = require('./handlers/customers').handler;
const customerSettingHandler = require('./handlers/customerSetting').handler;
const customerSettingsHandler = require('./handlers/customerSettings').handler;
const customerSubscriptionHandler = require('./handlers/customerSubscription').handler;
const customerSubscriptionsHandler = require('./handlers/customerSubscriptions').handler;
const customerSubscriptionCouponHandler = require('./handlers/customerSubscriptionCoupon').handler;
const customerSubscriptionCouponsHandler = require('./handlers/customerSubscriptionCoupons').handler;
const customerUserHandler = require('./handlers/customerUser').handler;
const customerUsersHandler = require('./handlers/customerUsers').handler;
const customerUserSettingHandler = require('./handlers/customerUserSetting').handler;
const customerUserSettingsHandler = require('./handlers/customerUserSettings').handler;

module.exports.handler = async (event, context) => {
  console.log('=== event log ===', event); // eslint-disable-line no-console

  const path = event.path;
  const httpMethod = event.httpMethod;

  const successResponses = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  const routes = Object.values(ROUTES);
  const actions = Object.keys(ROUTES);
  const patternIndex = routes.findIndex(route => {
    const pattern = new UrlPattern(route);
    return pattern.match(path)
  });

  console.log('search result is ', patternIndex); // eslint-disable-line no-console
  // switch (event.action) {
  //   case ACTION.CUSTOMER_ROOT:
  //     return customerHandler(event, context);
  //   case ACTION.CUSTOMER_SETTING:
  //     return customerSettingHandler(event, context);
  //   case ACTION.CREATE_CUSTOMER:
  //     return subscriptionHandler(event, context);
  //   case ACTION.LIST_CUSTOMER:
  //     return subscriptionCouponHandler(event, context);
  //   default:
  //     return successResponse;
  // }
  return successResponses;
};
