import { Injectable } from '@nestjs/common';

import { DateTimeProvider } from '../../../core/date-time/date-time-provider';
import { IdGenerator } from '../../../core/id-generator/id-generator';
import { TicketProduct } from '../../core/domain/ticket-product';
import { TicketProductRepository } from '../../core/domain/ticket-product.repository';
import { CreateTicketProductCommand } from './create-ticket-product.command';

@Injectable()
export class CreateTicketProductCommandHandler {
  constructor(
    private readonly dateTimeProvider: DateTimeProvider,
    private readonly idGenerator: IdGenerator,
    private readonly ticketProductRepository: TicketProductRepository,
  ) {}

  async handle(command: CreateTicketProductCommand): Promise<TicketProduct> {
    const now = this.dateTimeProvider.now();
    const ticketProduct = TicketProduct.build()
      .id(this.idGenerator.generate())
      .tenantId(command.tenantId)
      .eventId(command.eventId)
      .ticketTemplateId(command.ticketTemplateId)
      .name(command.name)
      .code(command.code)
      .description(command.description)
      .status('draft')
      .deliveryType(command.deliveryType)
      .availableQuantity(command.availableQuantity)
      .additionalInfo(command.additionalInfo)
      .salesStartsAt(command.salesStartsAt)
      .salesEndsAt(command.salesEndsAt)
      .maxValidationCount(command.maxValidationCount)
      .isSingleUse(command.isSingleUse)
      .validFrom(command.validFrom)
      .validUntil(command.validUntil)
      .validationRules(command.validationRules)
      .createdAt(now)
      .updatedAt(now)
      .build();

    return this.ticketProductRepository.create(ticketProduct);
  }
}
