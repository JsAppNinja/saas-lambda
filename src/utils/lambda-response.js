function lambdaResponse({ json, statusCode, allowCORS = false }) {
  const response = {
    statusCode,
    body: JSON.stringify(json),
  };

  if (allowCORS) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
    };
  }

  return response;
}

function errorResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 500,
  });
}

function corsErrorResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 500,
    allowCORS: true,
  });
}

function successResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 200,
  });
}

function corsSuccessResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 200,
    allowCORS: true,
  });
}

function ResourceNotFoundResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 404,
  });
}

function corsResourceNotFoundResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 404,
    allowCORS: true,
  });
}

function ResourceUpdatedResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 204,
  });
}

function corsResourceUpdatedResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 204,
    allowCORS: true,
  });
}

function InvalidResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 400,
  });
}

function corsInvalidResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 400,
    allowCORS: true,
  });
}

function AuthDeniedResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 403,
  });
}

function corsAuthDeniedResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 403,
    allowCORS: true,
  });
}

module.exports = {
  errorResponse,
  corsErrorResponse,
  successResponse,
  corsSuccessResponse,
  ResourceNotFoundResponse,
  corsResourceNotFoundResponse,
  ResourceUpdatedResponse,
  corsResourceUpdatedResponse,
  InvalidResponse,
  corsInvalidResponse,
  AuthDeniedResponse,
  corsAuthDeniedResponse,
};
