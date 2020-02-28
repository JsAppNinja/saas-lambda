module.exports = {
  CUSTOMERS: '/augmentt/customer',
  CUSTOMER: '/augmentt/customer/:customer_uuid',
  CUSTOMER_SETTINGS: '/augmentt/customer/:customer_uuid/setting',
  CUSTOMER_SETTING: '/augmentt/customer/:customer_uuid/setting/:setting_id',
  CUSTOMER_USERS: '/augmentt/customer/:customer_uuid/user',
  CUSTOMER_USER: '/augmentt/customer/:customer_uuid/user/:user_id',
  CUSTOMER_USER_SETTINGS: '/augmentt/customer/:customer_uuid/user/:user_id/setting',
  CUSTOMER_USER_SETTING: '/augmentt/customer/:customer_uuid/user/:user_id/setting/:setting_id',
  CUSTOMER_SUBSCRIPTIONS: '/augmentt/customer/:customer_uuid/subscription',
  CUSTOMER_SUBSCRIPTION: '/augmentt/customer/:customer_uuid/subscription/:subscription_id',
  CUSTOMER_SUBSCRIPTION_COUPONS: '/augmentt/customer/:customer_uuid/subscription/:subscription_id/coupon',
  CUSTOMER_SUBSCRIPTION_COUPON: '/augmentt/customer/:customer_uuid/subscription/:subscription_id/coupon/:coupon_id',
};
