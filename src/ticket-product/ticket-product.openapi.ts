import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiErrorResponseDto } from '../common/http/api-error-response.dto';
import { CreateTicketProductDto } from './create/adapter/create-ticket-product.dto';
import { TicketProductResponseDto } from './create/adapter/create-ticket-product.response.dto';

export function DescribeCreateTicketProduct(): MethodDecorator {
  return applyDecorators(
    ApiTags('ticket-product'),
    ApiOperation({
      summary: 'Create ticket product',
      description:
        'Creates a tenant-defined ticket product with inventory and validation settings.',
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
    ApiBody({
      type: CreateTicketProductDto,
    }),
    ApiCreatedResponse({
      description: 'Created ticket product.',
      type: TicketProductResponseDto,
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
