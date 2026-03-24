import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { GenericContainer, Wait } from 'testcontainers';

import { applicationDatabaseSchema } from '../../src/core/database/database.schema';
import { PostgresDatabase } from '../../src/core/database/postgres-database';

type StartedPostgresContainer = Awaited<ReturnType<GenericContainer['start']>>;

let postgresContainer: StartedPostgresContainer | null = null;
let databaseUrl: string | null = null;
let migrationsApplied = false;
let bootstrapPromise: Promise<void> | null = null;

export async function setupTestDatabase(): Promise<PostgresDatabase> {
  if (bootstrapPromise === null) {
    bootstrapPromise = bootstrapDatabase().catch((error: unknown): never => {
      bootstrapPromise = null;
      throw error;
    });
  }

  await bootstrapPromise;

  const resetPool = createPool();

  await resetPool.query(
    'truncate table "ticket_products" restart identity cascade',
  );
  await resetPool.end();

  return new PostgresDatabase();
}

async function bootstrapDatabase(): Promise<void> {
  await ensurePostgresContainer();

  if (migrationsApplied) {
    return;
  }

  await waitForDatabaseReady();
  await migrateDatabase();

  migrationsApplied = true;
}

async function ensurePostgresContainer(): Promise<void> {
  if (databaseUrl !== null) {
    return;
  }

  try {
    const startedPostgresContainer = await new GenericContainer(
      'postgres:16-alpine',
    )
      .withEnvironment({
        POSTGRES_DB: 'tickets_core_test',
        POSTGRES_USER: 'tickets',
        POSTGRES_PASSWORD: 'tickets',
      })
      .withExposedPorts(5432)
      .withWaitStrategy(
        Wait.forLogMessage('database system is ready to accept connections'),
      )
      .start();

    postgresContainer = startedPostgresContainer;
    databaseUrl = `postgresql://tickets:tickets@${startedPostgresContainer.getHost()}:${startedPostgresContainer.getMappedPort(5432)}/tickets_core_test`;
    process.env.DATABASE_URL = databaseUrl;
    await waitForDatabaseReady();

    return;
  } catch (error) {
    if (!isContainerRuntimeError(error)) {
      throw error;
    }
  }

  databaseUrl =
    process.env.DATABASE_URL ??
    'postgresql://tickets:tickets@localhost:5432/tickets_core';
  process.env.DATABASE_URL = databaseUrl;
}

function createPool(): Pool {
  if (databaseUrl === null) {
    throw new Error('Test database is not initialized.');
  }

  return new Pool({
    connectionString: databaseUrl,
  });
}

async function migrateDatabase(): Promise<void> {
  const migrationAttempts = 5;

  for (let attempt = 1; attempt <= migrationAttempts; attempt += 1) {
    const pool = createPool();
    const database = drizzle(pool, {
      schema: applicationDatabaseSchema,
    });

    try {
      await migrate(database, {
        migrationsFolder: 'drizzle',
      });
      await pool.end();
      return;
    } catch (error) {
      await pool.end().catch((): undefined => undefined);

      if (!isRetryableDatabaseError(error) || attempt === migrationAttempts) {
        throw error;
      }

      await delay(attempt * 1000);
    }
  }
}

async function waitForDatabaseReady(): Promise<void> {
  const readinessAttempts = 20;

  for (let attempt = 1; attempt <= readinessAttempts; attempt += 1) {
    const pool = createPool();

    try {
      await pool.query('select 1');
      await pool.end();
      return;
    } catch (error) {
      await pool.end().catch((): undefined => undefined);

      if (attempt === readinessAttempts) {
        throw error;
      }

      await delay(500);
    }
  }
}

async function delay(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve): void => {
    setTimeout(resolve, milliseconds);
  });
}

function isContainerRuntimeError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes(
      'Could not find a working container runtime strategy',
    )
  );
}

function isRetryableDatabaseError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('ECONNRESET') ||
      error.message.includes('Connection terminated unexpectedly') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('the database system is starting up'))
  );
}
