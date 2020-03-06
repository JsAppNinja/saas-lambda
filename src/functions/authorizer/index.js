const {
  successResponse,
  ResourceNotFoundResponse,
  AuthDeniedResponse,
  InvalidResponse,
} = require('../../utils/lambda-response');

module.exports.handler = async event => {
  var token = event.authorizationToken;
  let responseData, response;
  switch (token) {
    case 'allow':
      responseData = await generatePolicy('user', 'Allow', event.methodArn);
      response = successResponse({
        message: 'Your authorization has been successfully verified!',
        input: event,
        content: responseData,
      });
      return;
    case 'deny':
      responseData = await generatePolicy('user', 'Deny', event.methodArn);
      response = ResourceNotFoundResponse({
        message: 'Your authorization request has been denied to this resource',
        input: event,
        content: responseData,
      });
      return;
    case 'unauthorized':
      response = AuthDeniedResponse({
        message: 'You are not authorized to access to this resource',
        input: event,
      });
      return response;
    default:
      response = InvalidResponse({
        message: 'Invalid token',
        input: event,
      });
      return response;
  }
};

const generatePolicy = function(principalId, effect, resource) {
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
// var authenticationData = {
//   Username : 'username',
//   Password : 'password',
// };
// var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
// var poolData = {
//   UserPoolId : '...', // Your user pool id here
//   ClientId : '...' // Your client id here
// };
// var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
// var userData = {
//   Username : 'username',
//   Pool : userPool
// };
// var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
// cognitoUser.setAuthenticationFlowType(‘CUSTOM_AUTH’);
// cognitoUser.authenticateUser(authenticationDetails, {
//   onSuccess: function (result) {
//     console.log('access token + ' + result.getAccessToken().getJwtToken());
//   },

//   customChallenge: function (challengeParameters) {
//     //gather user responses in challengeResponses based on challengeParameters
//     cognitoUser.sendCustomChallengeAnswer(challengeResponses, this);
//   },

//   onFailure: function(err) {
//     alert(err);
//   },
// });
