const UrlPattern = require('url-pattern');

const {
  successResponse,
  InvalidResponse,
} = require('../../../utils/lambda-response');
const models = require('../../../models');

const Organization = models.organizations;

module.exports.handler = async (event, eventRoute) => {
  const { path } = event;
  const { httpMethod } = event;

  const pattern = new UrlPattern(eventRoute);
  const endpointInfo = pattern.match(path);
  console.log(path, endpointInfo, event); // eslint-disable-line no-console

  let responseData;
  let response;
  switch (httpMethod) {
    case 'GET':
      responseData = await Organization.findAll({
        attributes: ['id', 'organization_name', 'settings'],
      });
      response = successResponse({
        message: 'We are getting your requested organization information!',
        input: event,
        content: responseData,
      });
      return response;
    case 'PUT':
      responseData = await Organization.create({
        organization_name: 'New Organization Name',
      });
      response = successResponse({
        message: 'We have created a new organization information!',
        input: event,
        content: responseData,
      });
      return response;
    default:
      response = InvalidResponse({
        message: 'We can not handle your request!',
        input: event,
      });
      return response;
  }
};
