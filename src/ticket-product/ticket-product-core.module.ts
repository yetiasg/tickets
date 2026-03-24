import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { DrizzleTicketProductRepository } from './core/adapter/drizzle-ticket-product.repository';
import { TicketProductEntityToTicketProductConverter } from './core/adapter/ticket-product-entity-to-ticket-product.converter';
import { TicketProductToTicketProductEntityConverter } from './core/adapter/ticket-product-to-ticket-product-entity.converter';
import { TicketProductToTicketProductResponseDtoConverter } from './core/adapter/ticket-product-to-ticket-product-response.converter';
import { TicketProductRepository } from './core/domain/ticket-product.repository';
import { CreateTicketProductController } from './create/adapter/create-ticket-product.controller';
import { CreateTicketProductDtoToCommandConverter } from './create/adapter/create-ticket-product-dto-to-command.converter';
import { CreateTicketProductCommandHandler } from './create/use-case/create-ticket-product.command-handler';

@Module({
  imports: [CoreModule],
  controllers: [CreateTicketProductController],
  providers: [
    CreateTicketProductCommandHandler,
    CreateTicketProductDtoToCommandConverter,
    TicketProductEntityToTicketProductConverter,
    TicketProductToTicketProductEntityConverter,
    TicketProductToTicketProductResponseDtoConverter,
    DrizzleTicketProductRepository,
    {
      provide: TicketProductRepository,
      useExisting: DrizzleTicketProductRepository,
    },
  ],
})
export class TicketProductCoreModule {}
