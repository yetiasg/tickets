import { Injectable } from '@nestjs/common';

import { Converter } from '../../../common/converter/converter.interface';
import { CreateTicketProductCommand } from '../use-case/create-ticket-product.command';
import { CreateTicketProductDto } from './create-ticket-product.dto';

@Injectable()
export class CreateTicketProductDtoToCommandConverter implements Converter<
  CreateTicketProductDto,
  CreateTicketProductCommand
> {
  convert(requestDto: CreateTicketProductDto): CreateTicketProductCommand {
    return CreateTicketProductCommand.builder()
      .tenantId(requestDto.tenantId)
      .eventId(requestDto.eventId)
      .ticketTemplateId(requestDto.ticketTemplateId)
      .name(requestDto.name)
      .code(requestDto.code)
      .description(requestDto.description)
      .deliveryType(requestDto.deliveryType)
      .availableQuantity(requestDto.availableQuantity)
      .additionalInfo(requestDto.additionalInfo)
      .salesStartsAt(this.toDate(requestDto.salesStartsAt))
      .salesEndsAt(this.toDate(requestDto.salesEndsAt))
      .maxValidationCount(requestDto.maxValidationCount)
      .isSingleUse(requestDto.isSingleUse)
      .validFrom(this.toDate(requestDto.validFrom))
      .validUntil(this.toDate(requestDto.validUntil))
      .validationRules(requestDto.validationRules)
      .build();
  }

  private toDate(value: string | null): Date | null {
    if (value === null || value === undefined) {
      return null;
    }

    return new Date(value);
  }
}
