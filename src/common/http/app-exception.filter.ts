import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { DateTimeProvider } from '../../core/date-time/date-time-provider';
import { ApiErrorResponseDto } from './api-error-response.dto';

@Catch()
@Injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly dateTimeProvider: DateTimeProvider) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message = this.resolveMessage(exceptionResponse);
    const code = this.resolveCode(exceptionResponse, statusCode);
    const traceId = request.header('x-trace-id') ?? '';
    const correlationId = request.header('x-correlation-id') ?? '';

    response
      .status(statusCode)
      .json(
        new ApiErrorResponseDto(
          statusCode,
          code,
          message,
          request.originalUrl,
          this.dateTimeProvider.now().toISOString(),
          traceId,
          correlationId,
        ),
      );
  }

  private resolveMessage(
    exceptionResponse: string | object | null,
  ): string | string[] {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (
      exceptionResponse !== null &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const message = exceptionResponse.message;

      if (typeof message === 'string' || Array.isArray(message)) {
        return message;
      }
    }

    return 'Internal server error';
  }

  private resolveCode(
    exceptionResponse: string | object | null,
    statusCode: number,
  ): string {
    if (
      exceptionResponse !== null &&
      typeof exceptionResponse === 'object' &&
      'error' in exceptionResponse &&
      typeof exceptionResponse.error === 'string'
    ) {
      return exceptionResponse.error;
    }

    return HttpStatus[statusCode] ?? 'Error';
  }
}
