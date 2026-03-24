import { Injectable } from '@nestjs/common';

import { DrizzleBaseRepository } from '../../../common/persistence/drizzle-base-repository';
import { PostgresDatabase } from '../../../core/database/postgres-database';
import { TicketProduct } from '../domain/ticket-product';
import { TicketProductRepository } from '../domain/ticket-product.repository';
import { TicketProductEntity } from './ticket-product.entity';
import { ticketProductsTable } from './ticket-product.schema';
import { TicketProductEntityToTicketProductConverter } from './ticket-product-entity-to-ticket-product.converter';
import { TicketProductToTicketProductEntityConverter } from './ticket-product-to-ticket-product-entity.converter';

@Injectable()
export class DrizzleTicketProductRepository
  extends DrizzleBaseRepository<TicketProduct, string, TicketProductEntity>
  implements TicketProductRepository
{
  constructor(
    postgresDatabase: PostgresDatabase,
    ticketProductEntityToTicketProductConverter: TicketProductEntityToTicketProductConverter,
    ticketProductToTicketProductEntityConverter: TicketProductToTicketProductEntityConverter,
  ) {
    super(
      postgresDatabase,
      ticketProductEntityToTicketProductConverter,
      ticketProductToTicketProductEntityConverter,
      ticketProductsTable,
      TicketProduct.name,
    );
  }
}
