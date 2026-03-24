import { TicketProductToTicketProductResponseDtoConverter } from '../../../../src/ticket-product/core/adapter/ticket-product-to-ticket-product-response.converter';
import { createTicketProduct } from '../../ticket-product.helper';

describe('TicketProductToTicketProductResponseDtoConverter', (): void => {
  it('should convert ticket product to response dto when valid ticket product is provided', (): void => {
    const ticketProduct = createTicketProduct();
    const converter = new TicketProductToTicketProductResponseDtoConverter();

    const responseDto = converter.convert(ticketProduct);

    expect(responseDto.id).toBe(ticketProduct.id);
    expect(responseDto.tenantId).toBe(ticketProduct.tenantId);
    expect(responseDto.eventId).toBe(ticketProduct.eventId);
    expect(responseDto.ticketTemplateId).toBe(ticketProduct.ticketTemplateId);
    expect(responseDto.name).toBe(ticketProduct.name);
    expect(responseDto.code).toBe(ticketProduct.code);
    expect(responseDto.description).toBe(ticketProduct.description);
    expect(responseDto.status).toBe(ticketProduct.status);
    expect(responseDto.deliveryType).toBe(ticketProduct.deliveryType);
    expect(responseDto.availableQuantity).toBe(ticketProduct.availableQuantity);
    expect(responseDto.additionalInfo).toEqual(ticketProduct.additionalInfo);
    expect(responseDto.salesStartsAt).toBe(
      ticketProduct.salesStartsAt?.toISOString() ?? null,
    );
    expect(responseDto.salesEndsAt).toBe(
      ticketProduct.salesEndsAt?.toISOString() ?? null,
    );
    expect(responseDto.maxValidationCount).toBe(
      ticketProduct.maxValidationCount,
    );
    expect(responseDto.isSingleUse).toBe(ticketProduct.isSingleUse);
    expect(responseDto.validFrom).toBe(
      ticketProduct.validFrom?.toISOString() ?? null,
    );
    expect(responseDto.validUntil).toBe(
      ticketProduct.validUntil?.toISOString() ?? null,
    );
    expect(responseDto.validationRules).toEqual(ticketProduct.validationRules);
    expect(responseDto.createdAt).toBe(ticketProduct.createdAt.toISOString());
    expect(responseDto.updatedAt).toBe(ticketProduct.updatedAt.toISOString());
  });
});
