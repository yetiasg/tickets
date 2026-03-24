import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { HealthController } from './retrieve/adapter/health.controller';

@Module({
  imports: [CoreModule],
  controllers: [HealthController],
})
export class HealthCoreModule {}
