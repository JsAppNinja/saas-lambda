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
  console.log(endpointInfo); // eslint-disable-line no-console

  switch (httpMethod) {
    case 'GET':
      const ogData = await Organization.findAll({
        attributes: ['id', 'organization_name', 'settings'],
      });
      const getResponse = successResponse({
        message: 'We are getting your requested customer information!',
        input: event,
        content: ogData,
      });
      return getResponse;
    case 'PUT':
      const newData = await Organization.update(
        { organization_name: 'new Organization' },
        {
          where: {
            id: 2,
          },
        }
      );
      const putResponse = successResponse({
        message: 'We are updating your requested customer information!',
        input: event,
        content: newData,
      });
      return putResponse;
    default:
      const generalResponse = InvalidResponse({
        message: 'We can not handle your request!',
        input: event,
      });
      return generalResponse;
  }
};
