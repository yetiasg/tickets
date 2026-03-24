import { TicketProductToTicketProductEntityConverter } from '../../../../src/ticket-product/core/adapter/ticket-product-to-ticket-product-entity.converter';
import { createTicketProduct } from '../../ticket-product.helper';

describe('TicketProductToTicketProductEntityConverter', (): void => {
  it('should convert ticket product to persistence entity when valid ticket product is provided', (): void => {
    const ticketProduct = createTicketProduct();
    const converter = new TicketProductToTicketProductEntityConverter();

    const ticketProductEntity = converter.convert(ticketProduct);

    expect(ticketProductEntity.id).toBe(ticketProduct.id);
    expect(ticketProductEntity.tenantId).toBe(ticketProduct.tenantId);
    expect(ticketProductEntity.eventId).toBe(ticketProduct.eventId);
    expect(ticketProductEntity.ticketTemplateId).toBe(
      ticketProduct.ticketTemplateId,
    );
    expect(ticketProductEntity.name).toBe(ticketProduct.name);
    expect(ticketProductEntity.code).toBe(ticketProduct.code);
    expect(ticketProductEntity.description).toBe(ticketProduct.description);
    expect(ticketProductEntity.status).toBe(ticketProduct.status);
    expect(ticketProductEntity.deliveryType).toBe(ticketProduct.deliveryType);
    expect(ticketProductEntity.availableQuantity).toBe(
      ticketProduct.availableQuantity,
    );
    expect(ticketProductEntity.additionalInfo).toEqual(
      ticketProduct.additionalInfo,
    );
    expect(ticketProductEntity.salesStartsAt).toEqual(
      ticketProduct.salesStartsAt,
    );
    expect(ticketProductEntity.salesEndsAt).toEqual(ticketProduct.salesEndsAt);
    expect(ticketProductEntity.maxValidationCount).toBe(
      ticketProduct.maxValidationCount,
    );
    expect(ticketProductEntity.isSingleUse).toBe(ticketProduct.isSingleUse);
    expect(ticketProductEntity.validFrom).toEqual(ticketProduct.validFrom);
    expect(ticketProductEntity.validUntil).toEqual(ticketProduct.validUntil);
    expect(ticketProductEntity.validationRules).toEqual(
      ticketProduct.validationRules,
    );
    expect(ticketProductEntity.createdAt).toEqual(ticketProduct.createdAt);
    expect(ticketProductEntity.updatedAt).toEqual(ticketProduct.updatedAt);
  });
});
