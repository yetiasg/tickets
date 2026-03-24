export const ticketProductStatuses = [
  'draft',
  'active',
  'inactive',
  'archived',
] as const;

export type TicketProductStatus = (typeof ticketProductStatuses)[number];
