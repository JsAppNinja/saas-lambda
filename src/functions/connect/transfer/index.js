const wrapper = require('../../../utils/lambdaHelper');

module.exports.handler = wrapper(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event, null, 2)); // eslint-disable-line no-console
  const unit = 1000 * 1000 * 10000;
  const text = Math.floor(Math.random() * unit) % unit;
  const phoneNumber = `1${text}`;
  return {
    lambda_success: 1,
    transfer_number: phoneNumber,
  }
});
