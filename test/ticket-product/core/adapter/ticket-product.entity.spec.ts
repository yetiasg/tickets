import { TicketProductEntity } from '../../../../src/ticket-product/core/adapter/ticket-product.entity';
import {
  createTicketProductEntity,
  createTicketProductEntityProps,
} from '../../ticket-product.helper';

describe('TicketProductEntity', (): void => {
  it('should create persistence entity when valid ticket product entity properties are provided', (): void => {
    const ticketProductEntity = createTicketProductEntity();
    const ticketProductEntityProps = createTicketProductEntityProps();

    expect(ticketProductEntity).toBeInstanceOf(TicketProductEntity);
    expect(ticketProductEntity.id).toBe(ticketProductEntityProps.id);
    expect(ticketProductEntity.tenantId).toBe(
      ticketProductEntityProps.tenantId,
    );
    expect(ticketProductEntity.eventId).toBe(ticketProductEntityProps.eventId);
    expect(ticketProductEntity.ticketTemplateId).toBe(
      ticketProductEntityProps.ticketTemplateId,
    );
    expect(ticketProductEntity.name).toBe(ticketProductEntityProps.name);
    expect(ticketProductEntity.code).toBe(ticketProductEntityProps.code);
    expect(ticketProductEntity.description).toBe(
      ticketProductEntityProps.description,
    );
    expect(ticketProductEntity.status).toBe(ticketProductEntityProps.status);
    expect(ticketProductEntity.deliveryType).toBe(
      ticketProductEntityProps.deliveryType,
    );
    expect(ticketProductEntity.availableQuantity).toBe(
      ticketProductEntityProps.availableQuantity,
    );
    expect(ticketProductEntity.additionalInfo).toEqual(
      ticketProductEntityProps.additionalInfo,
    );
    expect(ticketProductEntity.salesStartsAt).toEqual(
      ticketProductEntityProps.salesStartsAt,
    );
    expect(ticketProductEntity.salesEndsAt).toEqual(
      ticketProductEntityProps.salesEndsAt,
    );
    expect(ticketProductEntity.maxValidationCount).toBe(
      ticketProductEntityProps.maxValidationCount,
    );
    expect(ticketProductEntity.isSingleUse).toBe(
      ticketProductEntityProps.isSingleUse,
    );
    expect(ticketProductEntity.validFrom).toEqual(
      ticketProductEntityProps.validFrom,
    );
    expect(ticketProductEntity.validUntil).toEqual(
      ticketProductEntityProps.validUntil,
    );
    expect(ticketProductEntity.validationRules).toEqual(
      ticketProductEntityProps.validationRules,
    );
    expect(ticketProductEntity.createdAt).toEqual(
      ticketProductEntityProps.createdAt,
    );
    expect(ticketProductEntity.updatedAt).toEqual(
      ticketProductEntityProps.updatedAt,
    );
  });

  it('should create builder from persistence entity when valid ticket product entity is provided', (): void => {
    const ticketProductEntity = createTicketProductEntity();

    const ticketProductEntityBuilder = ticketProductEntity.toBuilder();
    const clonedTicketProductEntity = ticketProductEntityBuilder.build();

    expect(clonedTicketProductEntity).toBeInstanceOf(TicketProductEntity);
    expect(clonedTicketProductEntity).toEqual(ticketProductEntity);
    expect(clonedTicketProductEntity).not.toBe(ticketProductEntity);
  });
});
