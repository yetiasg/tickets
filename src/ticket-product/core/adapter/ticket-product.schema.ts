import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  PgTableExtraConfigValue,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { ticketProductDeliveryTypes } from '../domain/ticket-product-delivery-type';
import { TicketProductMetadataObject } from '../domain/ticket-product-metadata-value';
import { ticketProductStatuses } from '../domain/ticket-product-status';

export const ticketProductStatusEnum = pgEnum(
  'ticket_product_status',
  ticketProductStatuses,
);

export const ticketProductDeliveryTypeEnum = pgEnum(
  'ticket_product_delivery_type',
  ticketProductDeliveryTypes,
);

export const ticketProductsTable = pgTable(
  'ticket_products',
  {
    id: uuid('id').primaryKey(),
    tenantId: uuid('tenant_id').notNull(),
    eventId: uuid('event_id').notNull(),
    ticketTemplateId: uuid('ticket_template_id'),
    name: varchar('name', { length: 255 }).notNull(),
    code: varchar('code', { length: 128 }).notNull(),
    description: text('description'),
    status: ticketProductStatusEnum('status').notNull(),
    deliveryType: ticketProductDeliveryTypeEnum('delivery_type').notNull(),
    availableQuantity: integer('available_quantity').notNull(),
    additionalInfo:
      jsonb('additional_info').$type<TicketProductMetadataObject>(),
    salesStartsAt: timestamp('sales_starts_at', { withTimezone: true }),
    salesEndsAt: timestamp('sales_ends_at', { withTimezone: true }),
    maxValidationCount: integer('max_validation_count').notNull(),
    isSingleUse: boolean('is_single_use').notNull(),
    validFrom: timestamp('valid_from', { withTimezone: true }),
    validUntil: timestamp('valid_until', { withTimezone: true }),
    validationRules:
      jsonb('validation_rules').$type<TicketProductMetadataObject>(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
  },
  (table): PgTableExtraConfigValue[] => [
    uniqueIndex('ticket_products_tenant_id_code_unique').on(
      table.tenantId,
      table.code,
    ),
    index('ticket_products_tenant_id_event_id_index').on(
      table.tenantId,
      table.eventId,
    ),
    index('ticket_products_tenant_id_status_index').on(
      table.tenantId,
      table.status,
    ),
    check(
      'ticket_products_available_quantity_check',
      sql`${table.availableQuantity} >= 0`,
    ),
    check(
      'ticket_products_max_validation_count_check',
      sql`${table.maxValidationCount} >= 1`,
    ),
    check(
      'ticket_products_validity_window_check',
      sql`${table.validUntil} is null or ${table.validFrom} is null or ${table.validUntil} >= ${table.validFrom}`,
    ),
  ],
);
