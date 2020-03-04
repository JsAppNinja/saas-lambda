const UrlPattern = require('url-pattern');

const ACTION = require('./constants');
const ROUTES = require('./routes');

const {
  successResponse,
  ResourceNotFoundResponse,
} = require('../../utils/lambda-response');

const organizationsHandler = require('./handlers/organizations').handler;
const organizationHandler = require('./handlers/organization').handler;
const organizationCustomerHandler = require('./handlers/organizations').handler;

module.exports.handler = async event => {
  const { path } = event;

  const requestSuccessResponse = successResponse({
    message: 'Your request has been executed successfully!',
    input: event,
  });

  const resourceNotFoundResponse = ResourceNotFoundResponse({
    message:
      'The requested API endpoint is invalid. Please input the correct URL!',
    input: event,
  });

  const routes = Object.values(ROUTES);
  const actions = Object.keys(ROUTES);
  const patternIndex = routes.findIndex(route => {
    const pattern = new UrlPattern(route);
    const result = pattern.match(path);
    return result != null;
  });

  if (patternIndex < 0) {
    return resourceNotFoundResponse;
  }
  const eventAction = actions[patternIndex];
  const eventRoute = routes[patternIndex];
  switch (eventAction) {
    case ACTION.ORGANIZATIONS:
      return organizationsHandler(event, eventRoute);
    case ACTION.ORGANIZATION:
      return organizationHandler(event, eventRoute);
    case ACTION.ORGANIZATION_CUSTOMER:
      return organizationCustomerHandler(event, eventRoute);
    default:
      return requestSuccessResponse;
  }
};
