import { ticketProductDeliveryTypes } from '../../../../src/ticket-product/core/domain/ticket-product-delivery-type';
import { EXPECTED_TICKET_PRODUCT_DELIVERY_TYPES } from '../../ticket-product.helper';

describe('ticketProductDeliveryTypes', (): void => {
  it('should expose allowed ticket product delivery types when domain constants are imported', (): void => {
    const actualTicketProductDeliveryTypes = ticketProductDeliveryTypes;

    expect(actualTicketProductDeliveryTypes).toEqual(
      EXPECTED_TICKET_PRODUCT_DELIVERY_TYPES,
    );
  });
});
