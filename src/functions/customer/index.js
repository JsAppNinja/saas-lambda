const UrlPattern = require('url-pattern');

const ACTION = require('./constants');
const ROUTES = require('./routes');

const { ResourceNotFoundResponse } = require('../../utils/lambda-response');

const customerHandler = require('./handlers/customer').handler;
const customerSettingHandler = require('./handlers/customerSetting').handler;
const customerSettingsHandler = require('./handlers/customerSettings').handler;
const customerSubscriptionHandler = require('./handlers/customerSubscription')
  .handler;
const customerSubscriptionsHandler = require('./handlers/customerSubscriptions')
  .handler;
const customerSubscriptionCouponHandler = require('./handlers/customerSubscriptionCoupon')
  .handler;
const customerSubscriptionCouponsHandler = require('./handlers/customerSubscriptionCoupons')
  .handler;
const customerUserHandler = require('./handlers/customerUser').handler;
const customerUsersHandler = require('./handlers/customerUsers').handler;
const customerUserSettingHandler = require('./handlers/customerUserSetting')
  .handler;
const customerUserSettingsHandler = require('./handlers/customerUserSettings')
  .handler;

module.exports.handler = async event => {
  const { path } = event;

  const resourceNotFoundResponse = ResourceNotFoundResponse({
    message:
      'The requested API endpoint is invalid. Please input the correct URL!',
    input: event,
  });

  const routes = Object.values(ROUTES);
  const patternIndex = routes.findIndex(route => {
    const pattern = new UrlPattern(route);
    const result = pattern.match(path);
    return result != null;
  });

  if (patternIndex < 0) {
    return resourceNotFoundResponse;
  }

  const actions = Object.keys(ROUTES);
  const eventAction = actions[patternIndex];
  const eventRoute = routes[patternIndex];

  switch (eventAction) {
    case ACTION.CUSTOMER:
      return customerHandler(event, eventRoute);
    case ACTION.CUSTOMER_SETTINGS:
      return customerSettingsHandler(event, eventRoute);
    case ACTION.CUSTOMER_SETTING:
      return customerSettingHandler(event, eventRoute);
    case ACTION.CUSTOMER_USERS:
      return customerUsersHandler(event, eventRoute);
    case ACTION.CUSTOMER_USER:
      return customerUserHandler(event, eventRoute);
    case ACTION.CUSTOMER_USER_SETTINGS:
      return customerUserSettingsHandler(event, eventRoute);
    case ACTION.CUSTOMER_USER_SETTING:
      return customerUserSettingHandler(event, eventRoute);
    case ACTION.CUSTOMER_SUBSCRIPTIONS:
      return customerSubscriptionsHandler(event, eventRoute);
    case ACTION.CUSTOMER_SUBSCRIPTION:
      return customerSubscriptionHandler(event, eventRoute);
    case ACTION.CUSTOMER_SUBSCRIPTION_COUPONS:
      return customerSubscriptionCouponsHandler(event, eventRoute);
    case ACTION.CUSTOMER_SUBSCRIPTION_COUPON:
      return customerSubscriptionCouponHandler(event, eventRoute);
    default:
      return resourceNotFoundResponse;
  }
};
