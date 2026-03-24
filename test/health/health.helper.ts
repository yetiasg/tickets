import { loadJsonResource } from '../test-lib/testing-json-resource.helper';

export const HEALTH_MODULE_NAME = 'health';
export const HEALTH_ENDPOINT_PATH = '/v1/health';

export function loadExpectedHealthResponse(): Promise<{
  status: string;
  timestamp: string;
}> {
  return loadJsonResource<{
    status: string;
    timestamp: string;
  }>('health/retrieve/adapter/get-health.response.json');
}

export function loadExpectedHealthRateLimitErrorResponse(): Promise<{
  statusCode: number;
  code: string;
  message: string;
  path: string;
  timestamp: string;
  traceId: string;
  correlationId: string;
}> {
  return loadJsonResource<{
    statusCode: number;
    code: string;
    message: string;
    path: string;
    timestamp: string;
    traceId: string;
    correlationId: string;
  }>('health/retrieve/adapter/get-health-rate-limit-error.response.json');
}
