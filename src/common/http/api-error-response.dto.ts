export class ApiErrorResponseDto {
  readonly statusCode: number;
  readonly code: string;
  readonly message: string | string[];
  readonly path: string;
  readonly timestamp: string;
  readonly traceId: string;
  readonly correlationId: string;

  constructor(
    statusCode: number,
    code: string,
    message: string | string[],
    path: string,
    timestamp: string,
    traceId: string,
    correlationId: string,
  ) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.path = path;
    this.timestamp = timestamp;
    this.traceId = traceId;
    this.correlationId = correlationId;
  }
}
