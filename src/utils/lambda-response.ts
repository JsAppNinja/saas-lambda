interface IJSON {
  [key: string]: any;
}

interface IResponseOptions {
  json: IJSON;
  statusCode: number;
  allowCORS?: boolean;
}

interface IResponse {
  statusCode: number;
  body: string;
  headers?: {
    [key: string]: any;
  };
}

function lambdaResponse({
  json,
  statusCode,
  allowCORS = false,
}: IResponseOptions) {
  const response: IResponse = {
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

function errorResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 500,
  });
}

function corsErrorResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 500,
    allowCORS: true,
  });
}

function successResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 200,
  });
}

function corsSuccessResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 200,
    allowCORS: true,
  });
}

function ResourceNotFoundResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 404,
  });
}

function corsResourceNotFoundResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 404,
    allowCORS: true,
  });
}

function ResourceUpdatedResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 204,
  });
}

function corsResourceUpdatedResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 204,
    allowCORS: true,
  });
}

function InvalidResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 400,
  });
}

function corsInvalidResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 400,
    allowCORS: true,
  });
}

function AuthDeniedResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 403,
  });
}

function corsAuthDeniedResponse(json: IJSON) {
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
