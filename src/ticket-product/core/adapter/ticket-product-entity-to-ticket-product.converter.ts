import { Injectable } from '@nestjs/common';

import { EntityToDomainConverter } from '../../../common/converter/entity-to-domain.converter.interface';
import { TicketProduct } from '../domain/ticket-product';
import {
  TicketProductEntity,
  TicketProductEntityProps,
} from './ticket-product.entity';

@Injectable()
export class TicketProductEntityToTicketProductConverter implements EntityToDomainConverter<
  TicketProductEntity,
  TicketProduct
> {
  convert(ticketProductEntity: TicketProductEntityProps): TicketProduct {
    return TicketProduct.build()
      .id(ticketProductEntity.id)
      .tenantId(ticketProductEntity.tenantId)
      .eventId(ticketProductEntity.eventId)
      .ticketTemplateId(structuredClone(ticketProductEntity.ticketTemplateId))
      .name(ticketProductEntity.name)
      .code(ticketProductEntity.code)
      .description(structuredClone(ticketProductEntity.description))
      .status(ticketProductEntity.status)
      .deliveryType(ticketProductEntity.deliveryType)
      .availableQuantity(ticketProductEntity.availableQuantity)
      .additionalInfo(structuredClone(ticketProductEntity.additionalInfo))
      .salesStartsAt(structuredClone(ticketProductEntity.salesStartsAt))
      .salesEndsAt(structuredClone(ticketProductEntity.salesEndsAt))
      .maxValidationCount(ticketProductEntity.maxValidationCount)
      .isSingleUse(ticketProductEntity.isSingleUse)
      .validFrom(structuredClone(ticketProductEntity.validFrom))
      .validUntil(structuredClone(ticketProductEntity.validUntil))
      .validationRules(structuredClone(ticketProductEntity.validationRules))
      .createdAt(structuredClone(ticketProductEntity.createdAt))
      .updatedAt(structuredClone(ticketProductEntity.updatedAt))
      .build();
  }
}
