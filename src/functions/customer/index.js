const UrlPattern = require('url-pattern');

const ACTION = require('./constants');
const ROUTES = require('./routes');

const { successResponse, ResourceNotFoundResponse } = require('../../utils/lambda-response');

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

  const { path } = event;
  const { httpMethod } = event;

  const requestSuccessResponse = successResponse({
    message: 'Your request has been executed successfully!',
    input: event,
  });

  const resourceNotFoundResponse = ResourceNotFoundResponse({
    message: 'The request route is invalid. Please input the correct URL!',
    input: event,
  });

  const routes = Object.values(ROUTES);
  const actions = Object.keys(ROUTES);
  const patternIndex = routes.findIndex((route) => {
    const pattern = new UrlPattern(route);
    const result = pattern.match(path);
    return result != null;
  });

  console.log('search result is ', patternIndex); // eslint-disable-line no-console
  if (patternIndex < 0) {
    return resourceNotFoundResponse;
  }
  const eventAction = actions[patternIndex];
  switch (eventAction) {
    case ACTION.CUSTOMERS:
      return customersHandler(event, httpMethod);
    case ACTION.CUSTOMER:
      return customerHandler(event, httpMethod);
    case ACTION.CUSTOMER_SETTINGS:
      return customerSettingsHandler(event, httpMethod);
    case ACTION.CUSTOMER_SETTING:
      return customerSettingHandler(event, httpMethod);
    case ACTION.CUSTOMER_USERS:
      return customerUsersHandler(event, httpMethod);
    case ACTION.CUSTOMER_USER:
      return customerUserHandler(event, httpMethod);
    case ACTION.CUSTOMER_USER_SETTINGS:
      return customerUserSettingsHandler(event, httpMethod);
    case ACTION.CUSTOMER_USER_SETTING:
      return customerUserSettingHandler(event, httpMethod);
    case ACTION.CUSTOMER_SUBSCRIPTIONS:
      return customerSubscriptionsHandler(event, httpMethod);
    case ACTION.CUSTOMER_SUBSCRIPTION:
      return customerSubscriptionHandler(event, httpMethod);
    case ACTION.CUSTOMER_SUBSCRIPTION_COUPONS:
      return customerSubscriptionCouponsHandler(event, httpMethod);
    case ACTION.CUSTOMER_SUBSCRIPTION_COUPON:
      return customerSubscriptionCouponHandler(event, httpMethod);
    default:
      return requestSuccessResponse;
  }
};
