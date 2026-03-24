export const HTTP_RATE_LIMIT_MAX_REQUESTS_ENV_NAME =
  'HTTP_RATE_LIMIT_MAX_REQUESTS';

export const HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS_ENV_NAME =
  'HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS';

const DEFAULT_HTTP_RATE_LIMIT_MAX_REQUESTS = 60;

const DEFAULT_HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS = 60_000;

export function getHttpRateLimitMaxRequests(): number {
  return parseIntegerFromEnvironment(
    process.env[HTTP_RATE_LIMIT_MAX_REQUESTS_ENV_NAME],
    DEFAULT_HTTP_RATE_LIMIT_MAX_REQUESTS,
  );
}

export function getHttpRateLimitTtlInMilliseconds(): number {
  return parseIntegerFromEnvironment(
    process.env[HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS_ENV_NAME],
    DEFAULT_HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS,
  );
}

function parseIntegerFromEnvironment(
  value: string | undefined,
  defaultValue: number,
): number {
  const parsedValue = Number.parseInt(value ?? '', 10);

  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
}
