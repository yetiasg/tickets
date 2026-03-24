import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

import {
  HTTP_RATE_LIMIT_MAX_REQUESTS_ENV_NAME,
  HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS_ENV_NAME,
} from '../../../../src/common/http/http-rate-limit.config';
import { createIntegrationContext } from '../../../test-lib/test.module';
import {
  TEST_CORRELATION_ID,
  TEST_TRACE_ID,
} from '../../../test-lib/testing.constants';
import {
  HEALTH_ENDPOINT_PATH,
  loadExpectedHealthRateLimitErrorResponse,
  loadExpectedHealthResponse,
} from '../../health.helper';

describe('HealthController [Integration]', (): void => {
  let ctx: INestApplication;
  let server: App;

  describe('HealthControllerRetrieve [Integration]', (): void => {
    beforeEach(async (): Promise<void> => {
      ctx = await createIntegrationContext();
      server = ctx.getHttpServer() as App;
    });

    afterEach(async (): Promise<void> => {
      await ctx.close();
    });

    it('getHealth GET /v1/health', async (): Promise<void> => {
      const expectedHealthResponse = await loadExpectedHealthResponse();

      const response = await request(server)
        .get(HEALTH_ENDPOINT_PATH)
        .set('x-trace-id', TEST_TRACE_ID)
        .set('x-correlation-id', TEST_CORRELATION_ID);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedHealthResponse);
    });
  });

  describe('HealthControllerRateLimit [Integration]', (): void => {
    let previousRateLimitMaxRequests: string | undefined;
    let previousRateLimitTtlInMilliseconds: string | undefined;

    beforeAll((): void => {
      previousRateLimitMaxRequests =
        process.env[HTTP_RATE_LIMIT_MAX_REQUESTS_ENV_NAME];
      previousRateLimitTtlInMilliseconds =
        process.env[HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS_ENV_NAME];

      process.env[HTTP_RATE_LIMIT_MAX_REQUESTS_ENV_NAME] = '1';
      process.env[HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS_ENV_NAME] = '60000';
    });

    afterAll((): void => {
      restoreEnvironmentValue(
        HTTP_RATE_LIMIT_MAX_REQUESTS_ENV_NAME,
        previousRateLimitMaxRequests,
      );
      restoreEnvironmentValue(
        HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS_ENV_NAME,
        previousRateLimitTtlInMilliseconds,
      );
    });

    beforeEach(async (): Promise<void> => {
      ctx = await createIntegrationContext();
      server = ctx.getHttpServer() as App;
    });

    afterEach(async (): Promise<void> => {
      await ctx.close();
    });

    it('getHealthRateLimit GET /v1/health', async (): Promise<void> => {
      const expectedErrorResponse =
        await loadExpectedHealthRateLimitErrorResponse();

      const firstResponse = await request(server)
        .get(HEALTH_ENDPOINT_PATH)
        .set('x-trace-id', TEST_TRACE_ID)
        .set('x-correlation-id', TEST_CORRELATION_ID);

      const secondResponse = await request(server)
        .get(HEALTH_ENDPOINT_PATH)
        .set('x-trace-id', TEST_TRACE_ID)
        .set('x-correlation-id', TEST_CORRELATION_ID);

      expect(firstResponse.status).toBe(200);
      expect(secondResponse.status).toBe(429);
      expect(secondResponse.body).toEqual(expectedErrorResponse);
    });
  });
});

function restoreEnvironmentValue(
  key: string,
  previousValue: string | undefined,
): void {
  if (previousValue === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = previousValue;
}
