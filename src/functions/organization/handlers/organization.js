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
  console.log(path, endpointInfo); // eslint-disable-line no-console
  const orgId = 2;

  let responseData;
  let response;

  switch (httpMethod) {
    case 'GET':
      responseData = await Organization.findByPk(orgId);
      response = successResponse({
        message: `We are getting ${orgId} organization information!`,
        input: event,
        result: responseData,
      });
      return response;
    case 'POST':
      const responseData = await Organization.findByPk(orgId);
      if (responseData) {
        responseData.update({
          organization_name: 'new Organization',
        });
      }
      response = successResponse({
        message: 'We have updated your requested organization information!',
        input: event,
        result: responseData,
      });
      return response;
    case 'DELETE':
      responseData = await Organization.destroy({
        where: {
          id: orgId,
        },
      });
      response = successResponse({
        message: 'We have deleted your requested organization information!',
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
