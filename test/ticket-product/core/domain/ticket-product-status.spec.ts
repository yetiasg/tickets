import { ticketProductStatuses } from '../../../../src/ticket-product/core/domain/ticket-product-status';
import { EXPECTED_TICKET_PRODUCT_STATUSES } from '../../ticket-product.helper';

describe('ticketProductStatuses', (): void => {
  it('should expose allowed ticket product statuses when domain constants are imported', (): void => {
    const actualTicketProductStatuses = ticketProductStatuses;

    expect(actualTicketProductStatuses).toEqual(
      EXPECTED_TICKET_PRODUCT_STATUSES,
    );
  });
});
