import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModule,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';

import { AppExceptionFilter } from './common/http/app-exception.filter';
import {
  getHttpRateLimitMaxRequests,
  getHttpRateLimitTtlInMilliseconds,
} from './common/http/http-rate-limit.config';
import { CoreModule } from './core/core.module';
import { HealthCoreModule } from './health/health-core.module';
import { TicketProductCoreModule } from './ticket-product/ticket-product-core.module';

@Module({
  imports: [
    CoreModule,
    HealthCoreModule,
    TicketProductCoreModule,
    ThrottlerModule.forRootAsync({
      useFactory: (): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: getHttpRateLimitTtlInMilliseconds(),
            limit: getHttpRateLimitMaxRequests(),
          },
        ],
      }),
    }),
  ],
  providers: [
    AppExceptionFilter,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
