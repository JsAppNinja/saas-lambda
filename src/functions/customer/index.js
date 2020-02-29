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

  const path = event.path;
  const httpMethod = event.httpMethod;

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
  const options = {
    segmentNameCharset: 'a-zA-Z0-9_',
  };
  const patternIndex = routes.findIndex(route => {
    const pattern = new UrlPattern(route, options);
    const result = pattern.match(path);
    console.log('Testing patterns =>', pattern, result); // eslint-disable-line no-console
    return result != null;
  });

  console.log('search result is ', patternIndex); // eslint-disable-line no-console
  if (patternIndex < 0 ) {
    return resourceNotFoundResponse;
  } else {
    const event = actions[patternIndex];
    // switch (event) {
    //   case ACTION.CUSTOMERS:
    //     return customersHandler(event, context);
    //   case ACTION.CUSTOMER:
    //     return customerHandler(event, context);
    //   case ACTION.CUSTOMER_SETTINGS:
    //     return customerSettingsHandler(event, context);
    //   case ACTION.CUSTOMER_SETTING:
    //     return customerSettingHandler(event, context);
    //   case ACTION.CUSTOMER_USERS:
    //     return customerUsersHandler(event, context);
    //   case ACTION.CUSTOMER_USER:
    //     return customerUserHandler(event, context);
    //   case ACTION.CUSTOMER_USER_SETTINGS:
    //     return customerUserSettingsHandler(event, context);
    //   case ACTION.CUSTOMER_USER_SETTING:
    //     return customerUserSettingHandler(event, context);
    //   case ACTION.CUSTOMER_SUBSCRIPTIONS:
    //     return customerSubscriptionsHandler(event, context);
    //   case ACTION.CUSTOMER_SUBSCRIPTION:
    //     return customerSubscriptionHandler(event, context);  
    //   case ACTION.CUSTOMER_SUBSCRIPTION_COUPONS:
    //     return customerSubscriptionCouponsHandler(event, context); 
    //   case ACTION.CUSTOMER_SUBSCRIPTION_COUPON:
    //     return customerSubscriptionCouponHandler(event, context); 
    //   default:
    //     return requestSuccessResponse;
    // }
    return requestSuccessResponse;
  }
};
