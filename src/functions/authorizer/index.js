const { AuthDeniedResponse } = require('../../utils/lambda-response');

module.exports.handler = async (event) => {
  const { headers } = event;
  const { queryStringParameters } = event;
  const { pathParameters } = event;
  const { stageVariables } = event;

  // Parse the input for the parameter values
  const tmp = event.methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');
  const awsAccountId = tmp[4];
  const region = tmp[3];
  const restApiId = apiGatewayArnTmp[0];
  const stage = apiGatewayArnTmp[1];
  const method = apiGatewayArnTmp[2];
  const resource = '/';
  if (apiGatewayArnTmp[3]) {
    resource += apiGatewayArnTmp[3];
  }

  /* Perform authorization to return the Allow policy for correct parameters and
  the 'Unauthorized' error, otherwise. */
  const authResponse = {};
  const condition = {};
  condition.IpAddress = {};

  if (headers.HeaderAuth1 === 'headerValue1'
      && queryStringParameters.QueryString1 === 'queryValue1'
      && stageVariables.StageVar1 === 'stageValue1') {
    return generateAllow('me', event.methodArn);
  }
  const response = AuthDeniedResponse({
    message: 'You are not authorized to access to this resource',
    input: event,
  });
  return response;
};

// Help function to generate an IAM policy
const generatePolicy = function (principalId, effect, resource) {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    stringKey: 'stringval',
    numberKey: 123,
    booleanKey: true,
  };
  return authResponse;
};

const generateAllow = function (principalId, resource) {
  return generatePolicy(principalId, 'Allow', resource);
};

const generateDeny = function (principalId, resource) {
  return generatePolicy(principalId, 'Deny', resource);
};
