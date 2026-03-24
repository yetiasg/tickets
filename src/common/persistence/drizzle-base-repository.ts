import { eq } from 'drizzle-orm';
import { type Converter } from 'src/common/converter/converter.interface';
import { PostgresDatabase } from 'src/core/database/postgres-database';

import { BaseRepository } from './drizzle-base-repository.interface';

export abstract class DrizzleBaseRepository<
  Domain,
  Id,
  Entity,
> implements BaseRepository<Domain, Id> {
  constructor(
    protected readonly postgresDatabase: PostgresDatabase,
    private readonly entityToDomainConverter: Converter<Entity, Domain>,
    private readonly domainToEntityConverter: Converter<Domain, Entity>,
    private readonly table: object,
    private readonly resourceType: string,
  ) {}

  async create(domain: Domain): Promise<Domain> {
    const entity = this.domainToEntityConverter.convert(domain);
    const createdRows = await this.postgresDatabase.db
      .insert(this.table as never)
      .values(entity as never)
      .returning();
    const createdEntity = createdRows[0] as Entity | undefined;
    if (createdEntity === undefined) {
      throw new Error(`${this.resourceType} was not persisted.`);
    }
    return this.entityToDomainConverter.convert(createdEntity);
  }

  async findById(id: Id): Promise<Domain | null> {
    const entityRows = await this.postgresDatabase.db
      .select()
      .from(this.table as never)
      .where(eq((this.table as { id: Id }).id as never, id) as never)
      .limit(1);
    const entity = entityRows[0] as Entity | undefined;
    if (entity === undefined) return null;
    return this.entityToDomainConverter.convert(entity);
  }
}
