import { TicketProduct } from '../../../../src/ticket-product/core/domain/ticket-product';
import {
  createTicketProduct,
  createTicketProductBuilder,
  createTicketProductData,
} from '../../ticket-product.helper';

describe('TicketProduct', (): void => {
  it('should create ticket product when valid builder values are provided', (): void => {
    const ticketProduct = createTicketProductBuilder().build();
    const ticketProductData = createTicketProductData();

    expect(ticketProduct).toBeInstanceOf(TicketProduct);
    expect(ticketProduct.id).toBe(ticketProductData.id);
    expect(ticketProduct.tenantId).toBe(ticketProductData.tenantId);
    expect(ticketProduct.eventId).toBe(ticketProductData.eventId);
    expect(ticketProduct.ticketTemplateId).toBe(
      ticketProductData.ticketTemplateId,
    );
    expect(ticketProduct.name).toBe(ticketProductData.name);
    expect(ticketProduct.code).toBe(ticketProductData.code);
    expect(ticketProduct.description).toBe(ticketProductData.description);
    expect(ticketProduct.status).toBe(ticketProductData.status);
    expect(ticketProduct.deliveryType).toBe(ticketProductData.deliveryType);
    expect(ticketProduct.availableQuantity).toBe(
      ticketProductData.availableQuantity,
    );
    expect(ticketProduct.additionalInfo).toEqual(
      ticketProductData.additionalInfo,
    );
    expect(ticketProduct.salesStartsAt).toEqual(
      ticketProductData.salesStartsAt,
    );
    expect(ticketProduct.salesEndsAt).toEqual(ticketProductData.salesEndsAt);
    expect(ticketProduct.maxValidationCount).toBe(
      ticketProductData.maxValidationCount,
    );
    expect(ticketProduct.isSingleUse).toBe(ticketProductData.isSingleUse);
    expect(ticketProduct.validFrom).toEqual(ticketProductData.validFrom);
    expect(ticketProduct.validUntil).toEqual(ticketProductData.validUntil);
    expect(ticketProduct.validationRules).toEqual(
      ticketProductData.validationRules,
    );
    expect(ticketProduct.createdAt).toEqual(ticketProductData.createdAt);
    expect(ticketProduct.updatedAt).toEqual(ticketProductData.updatedAt);
  });

  it('should create domain object when valid ticket product properties are provided', (): void => {
    const ticketProduct = createTicketProduct();
    const ticketProductData = createTicketProductData();

    expect(ticketProduct).toBeInstanceOf(TicketProduct);
    expect(ticketProduct.id).toBe(ticketProductData.id);
    expect(ticketProduct.tenantId).toBe(ticketProductData.tenantId);
    expect(ticketProduct.eventId).toBe(ticketProductData.eventId);
    expect(ticketProduct.ticketTemplateId).toBe(
      ticketProductData.ticketTemplateId,
    );
    expect(ticketProduct.name).toBe(ticketProductData.name);
    expect(ticketProduct.code).toBe(ticketProductData.code);
    expect(ticketProduct.description).toBe(ticketProductData.description);
    expect(ticketProduct.status).toBe(ticketProductData.status);
    expect(ticketProduct.deliveryType).toBe(ticketProductData.deliveryType);
    expect(ticketProduct.availableQuantity).toBe(
      ticketProductData.availableQuantity,
    );
    expect(ticketProduct.additionalInfo).toEqual(
      ticketProductData.additionalInfo,
    );
    expect(ticketProduct.salesStartsAt).toEqual(
      ticketProductData.salesStartsAt,
    );
    expect(ticketProduct.salesEndsAt).toEqual(ticketProductData.salesEndsAt);
    expect(ticketProduct.maxValidationCount).toBe(
      ticketProductData.maxValidationCount,
    );
    expect(ticketProduct.isSingleUse).toBe(ticketProductData.isSingleUse);
    expect(ticketProduct.validFrom).toEqual(ticketProductData.validFrom);
    expect(ticketProduct.validUntil).toEqual(ticketProductData.validUntil);
    expect(ticketProduct.validationRules).toEqual(
      ticketProductData.validationRules,
    );
    expect(ticketProduct.createdAt).toEqual(ticketProductData.createdAt);
    expect(ticketProduct.updatedAt).toEqual(ticketProductData.updatedAt);
  });

  it('should clone ticket product when toBuilder is called on instance', (): void => {
    const ticketProduct = createTicketProduct();
    const builtTicketProduct = ticketProduct.toBuilder().build();

    expect(builtTicketProduct).toBeInstanceOf(TicketProduct);
    expect(builtTicketProduct).not.toBe(ticketProduct);
    expect(builtTicketProduct).toEqual(ticketProduct);
  });
});
