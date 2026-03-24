import { applyDecorators } from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiErrorResponseDto } from '../common/http/api-error-response.dto';

export function DescribeHealthCheck(): MethodDecorator {
  return applyDecorators(
    ApiTags('health'),
    ApiOperation({
      summary: 'Return service health status',
      description:
        'Provides a minimal health payload for runtime verification.',
    }),
    ApiHeader({
      name: 'x-trace-id',
      required: false,
      description: 'Optional request trace identifier.',
    }),
    ApiHeader({
      name: 'x-correlation-id',
      required: false,
      description: 'Optional correlation identifier.',
    }),
    ApiOkResponse({
      description: 'Current service health status.',
      schema: {
        type: 'object',
        required: ['status', 'timestamp'],
        properties: {
          status: {
            type: 'string',
            example: 'ok',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2026-03-23T12:00:00.000Z',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Consistent application error response.',
      type: ApiErrorResponseDto,
    }),
    ApiResponse({
      status: 429,
      description: 'Rate limit exceeded.',
      type: ApiErrorResponseDto,
    }),
  );
}
