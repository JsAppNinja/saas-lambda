const UrlPattern = require('url-pattern');

const ACTION = require('./constants');
const ROUTES = require('./routes');

const { ResourceNotFoundResponse } = require('../utils/lambda-response');
const organizationModuleHandler = require('./organization').handler;
const customerModuleHandler = require('./customer').handler;

module.exports.handler = async (event, context) => {
  const { path } = event;

  const resourceNotFoundResponse = ResourceNotFoundResponse({
    message: 'The requested route is invalid. Please input the correct URL!',
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
  switch (eventAction) {
    case ACTION.ORGANIZATION:
      return organizationModuleHandler(event, context);
    case ACTION.CUSTOMER:
      return customerModuleHandler(event, eventRoute);
    default:
      return resourceNotFoundResponse;
  }
};
