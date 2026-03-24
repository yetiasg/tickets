import { Injectable } from '@nestjs/common';

import { Converter } from '../../../common/converter/converter.interface';
import { TicketProductResponseDto } from '../../create/adapter/create-ticket-product.response.dto';
import { TicketProduct } from '../domain/ticket-product';

@Injectable()
export class TicketProductToTicketProductResponseDtoConverter implements Converter<
  TicketProduct,
  TicketProductResponseDto
> {
  convert(ticketProduct: TicketProduct): TicketProductResponseDto {
    return TicketProductResponseDto.builder()
      .id(ticketProduct.id)
      .tenantId(ticketProduct.tenantId)
      .eventId(ticketProduct.eventId)
      .ticketTemplateId(ticketProduct.ticketTemplateId)
      .name(ticketProduct.name)
      .code(ticketProduct.code)
      .description(ticketProduct.description)
      .status(ticketProduct.status)
      .deliveryType(ticketProduct.deliveryType)
      .availableQuantity(ticketProduct.availableQuantity)
      .additionalInfo(ticketProduct.additionalInfo)
      .salesStartsAt(ticketProduct.salesStartsAt?.toISOString() ?? null)
      .salesEndsAt(ticketProduct.salesEndsAt?.toISOString() ?? null)
      .maxValidationCount(ticketProduct.maxValidationCount)
      .isSingleUse(ticketProduct.isSingleUse)
      .validFrom(ticketProduct.validFrom?.toISOString() ?? null)
      .validUntil(ticketProduct.validUntil?.toISOString() ?? null)
      .validationRules(ticketProduct.validationRules)
      .createdAt(ticketProduct.createdAt.toISOString())
      .updatedAt(ticketProduct.updatedAt.toISOString())
      .build();
  }
}
