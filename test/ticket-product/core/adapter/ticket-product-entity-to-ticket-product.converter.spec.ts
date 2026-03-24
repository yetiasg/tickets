import { TicketProductEntityToTicketProductConverter } from '../../../../src/ticket-product/core/adapter/ticket-product-entity-to-ticket-product.converter';
import { createTicketProductEntity } from '../../ticket-product.helper';

describe('TicketProductEntityToTicketProductConverter', (): void => {
  it('should convert persistence entity to ticket product when valid ticket product entity is provided', (): void => {
    const ticketProductEntity = createTicketProductEntity();
    const converter = new TicketProductEntityToTicketProductConverter();

    const ticketProduct = converter.convert(ticketProductEntity);

    expect(ticketProduct.id).toBe(ticketProductEntity.id);
    expect(ticketProduct.tenantId).toBe(ticketProductEntity.tenantId);
    expect(ticketProduct.eventId).toBe(ticketProductEntity.eventId);
    expect(ticketProduct.ticketTemplateId).toBe(
      ticketProductEntity.ticketTemplateId,
    );
    expect(ticketProduct.name).toBe(ticketProductEntity.name);
    expect(ticketProduct.code).toBe(ticketProductEntity.code);
    expect(ticketProduct.description).toBe(ticketProductEntity.description);
    expect(ticketProduct.status).toBe(ticketProductEntity.status);
    expect(ticketProduct.deliveryType).toBe(ticketProductEntity.deliveryType);
    expect(ticketProduct.availableQuantity).toBe(
      ticketProductEntity.availableQuantity,
    );
    expect(ticketProduct.additionalInfo).toEqual(
      ticketProductEntity.additionalInfo,
    );
    expect(ticketProduct.salesStartsAt).toEqual(
      ticketProductEntity.salesStartsAt,
    );
    expect(ticketProduct.salesEndsAt).toEqual(ticketProductEntity.salesEndsAt);
    expect(ticketProduct.maxValidationCount).toBe(
      ticketProductEntity.maxValidationCount,
    );
    expect(ticketProduct.isSingleUse).toBe(ticketProductEntity.isSingleUse);
    expect(ticketProduct.validFrom).toEqual(ticketProductEntity.validFrom);
    expect(ticketProduct.validUntil).toEqual(ticketProductEntity.validUntil);
    expect(ticketProduct.validationRules).toEqual(
      ticketProductEntity.validationRules,
    );
    expect(ticketProduct.createdAt).toEqual(ticketProductEntity.createdAt);
    expect(ticketProduct.updatedAt).toEqual(ticketProductEntity.updatedAt);
  });
});
