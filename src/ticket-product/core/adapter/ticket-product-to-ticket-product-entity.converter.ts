import { Injectable } from '@nestjs/common';
import { Converter } from 'src/common/converter/converter.interface';

import { TicketProduct } from '../domain/ticket-product';
import { TicketProductEntity } from './ticket-product.entity';

@Injectable()
export class TicketProductToTicketProductEntityConverter implements Converter<
  TicketProduct,
  TicketProductEntity
> {
  convert(ticketProduct: TicketProduct): TicketProductEntity {
    return TicketProductEntity.builder()
      .id(ticketProduct.id)
      .tenantId(ticketProduct.tenantId)
      .eventId(ticketProduct.eventId)
      .ticketTemplateId(structuredClone(ticketProduct.ticketTemplateId))
      .name(ticketProduct.name)
      .code(ticketProduct.code)
      .description(structuredClone(ticketProduct.description))
      .status(ticketProduct.status)
      .deliveryType(ticketProduct.deliveryType)
      .availableQuantity(ticketProduct.availableQuantity)
      .additionalInfo(structuredClone(ticketProduct.additionalInfo))
      .salesStartsAt(structuredClone(ticketProduct.salesStartsAt))
      .salesEndsAt(structuredClone(ticketProduct.salesEndsAt))
      .maxValidationCount(ticketProduct.maxValidationCount)
      .isSingleUse(ticketProduct.isSingleUse)
      .validFrom(structuredClone(ticketProduct.validFrom))
      .validUntil(structuredClone(ticketProduct.validUntil))
      .validationRules(structuredClone(ticketProduct.validationRules))
      .createdAt(structuredClone(ticketProduct.createdAt))
      .updatedAt(structuredClone(ticketProduct.updatedAt))
      .build();
  }
}
