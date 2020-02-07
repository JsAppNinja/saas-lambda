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

export function errorResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 500,
  });
}

export function corsErrorResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 500,
    allowCORS: true,
  });
}

export function successResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 200,
  });
}

export function corsSuccessResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 200,
    allowCORS: true,
  });
}

export function ResourceNotFoundResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 404,
  });
}

export function corsResourceNotFoundResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 404,
    allowCORS: true,
  });
}

export function ResourceUpdatedResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 204,
  });
}

export function corsResourceUpdatedResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 204,
    allowCORS: true,
  });
}

export function InvalidResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 400,
  });
}

export function corsInvalidResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 400,
    allowCORS: true,
  });
}

export function AuthDeniedResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 403,
  });
}

export function corsAuthDeniedResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 403,
    allowCORS: true,
  });
}
