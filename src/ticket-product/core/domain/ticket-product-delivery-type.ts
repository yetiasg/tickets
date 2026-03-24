export const ticketProductDeliveryTypes = [
  'digital_pdf',
  'digital_qr',
  'physical_qr',
] as const;

export type TicketProductDeliveryType =
  (typeof ticketProductDeliveryTypes)[number];
