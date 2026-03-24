import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { applicationDatabaseSchema } from './database.schema';

export type ApplicationDatabase = NodePgDatabase<
  typeof applicationDatabaseSchema
>;

@Injectable()
export class PostgresDatabase implements OnApplicationShutdown {
  private readonly pool: Pool;
  private readonly database: ApplicationDatabase;

  constructor() {
    this.pool = new Pool({
      connectionString: this.getDatabaseUrl(),
    });
    this.database = drizzle(this.pool, {
      schema: applicationDatabaseSchema,
    });
  }

  get db(): ApplicationDatabase {
    return this.database;
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }

  private getDatabaseUrl(): string {
    const databaseUrl = process.env.DATABASE_URL;

    if (databaseUrl === undefined || databaseUrl.length === 0) {
      throw new Error('DATABASE_URL is required.');
    }

    return databaseUrl;
  }
}
