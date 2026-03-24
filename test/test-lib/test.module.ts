import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { configureApplication } from '../../src/app.setup';
import { PostgresDatabase } from '../../src/core/database/postgres-database';
import { DateTimeProvider } from '../../src/core/date-time/date-time-provider';
import { IdGenerator } from '../../src/core/id-generator/id-generator';
import { setupTestDatabase } from './test-postgres';
import { TEST_DATE, TEST_ID } from './testing.constants';

class FixedDateTimeProvider extends DateTimeProvider {
  now(): Date {
    return TEST_DATE;
  }
}

class FixedIdGenerator extends IdGenerator {
  generate(): string {
    return TEST_ID;
  }
}

export async function createIntegrationContext(): Promise<INestApplication> {
  const testPostgresDatabase = await setupTestDatabase();

  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PostgresDatabase)
    .useValue(testPostgresDatabase)
    .overrideProvider(DateTimeProvider)
    .useClass(FixedDateTimeProvider)
    .overrideProvider(IdGenerator)
    .useClass(FixedIdGenerator)
    .compile();

  const application = testingModule.createNestApplication();

  configureApplication(application);

  await application.init();

  return application;
}
