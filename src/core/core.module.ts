import { Module } from '@nestjs/common';

import { PostgresDatabase } from './database/postgres-database';
import { DateTimeProvider } from './date-time/date-time-provider';
import { SystemDateTimeProviderService } from './date-time/system-date-time-provider.service';
import { IdGenerator } from './id-generator/id-generator';
import { UuidV4IdGeneratorService } from './id-generator/uuid-v4-id-generator.service';

@Module({
  providers: [
    PostgresDatabase,
    SystemDateTimeProviderService,
    UuidV4IdGeneratorService,
    {
      provide: DateTimeProvider,
      useExisting: SystemDateTimeProviderService,
    },
    {
      provide: IdGenerator,
      useExisting: UuidV4IdGeneratorService,
    },
  ],
  exports: [PostgresDatabase, DateTimeProvider, IdGenerator],
})
export class CoreModule {}
