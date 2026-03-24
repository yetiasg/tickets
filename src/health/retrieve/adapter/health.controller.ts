import { Controller, Get } from '@nestjs/common';

import { DateTimeProvider } from '../../../core/date-time/date-time-provider';
import { DescribeHealthCheck } from '../../health.openapi';
import { HealthResponseDto } from './health-response.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly dateTimeProvider: DateTimeProvider) {}

  @Get()
  @DescribeHealthCheck()
  getHealth(): HealthResponseDto {
    return HealthResponseDto.build()
      .status('ok')
      .timestamp(this.dateTimeProvider.now().toISOString())
      .build();
  }
}
