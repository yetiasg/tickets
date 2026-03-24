import { TicketProduct } from './ticket-product';

export abstract class TicketProductRepository {
  abstract create(ticketProduct: TicketProduct): Promise<TicketProduct>;
  abstract findById(id: string): Promise<TicketProduct | null>;
}
