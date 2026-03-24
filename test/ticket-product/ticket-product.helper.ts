import { IBuilder } from 'builder-pattern';

import {
  TicketProductEntity,
  TicketProductEntityProps,
} from '../../src/ticket-product/core/adapter/ticket-product.entity';
import { TicketProduct } from '../../src/ticket-product/core/domain/ticket-product';
import { ticketProductDeliveryTypes } from '../../src/ticket-product/core/domain/ticket-product-delivery-type';
import { ticketProductStatuses } from '../../src/ticket-product/core/domain/ticket-product-status';
import { loadJsonResource } from '../test-lib/testing-json-resource.helper';

export const TICKET_PRODUCTS_TABLE_NAME = 'ticket_products';
export const TICKET_PRODUCTS_ENDPOINT_PATH = '/v1/ticket-products';

export const TICKET_PRODUCTS_UNIQUE_INDEX_NAME =
  'ticket_products_tenant_id_code_unique';

export const TICKET_PRODUCTS_REQUIRED_COLUMN_NAMES = [
  'id',
  'tenant_id',
  'event_id',
  'name',
  'code',
  'status',
  'delivery_type',
  'available_quantity',
  'max_validation_count',
  'is_single_use',
  'created_at',
  'updated_at',
] as const;

export const EXPECTED_TICKET_PRODUCT_STATUSES = ticketProductStatuses;

export const EXPECTED_TICKET_PRODUCT_DELIVERY_TYPES =
  ticketProductDeliveryTypes;

export const createTicketProductData = (): Partial<TicketProduct> => ({
  id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
  tenantId: 'de305d54-75b4-431b-adb2-eb6b9e546015',
  eventId: 'de305d54-75b4-431b-adb2-eb6b9e546016',
  ticketTemplateId: 'de305d54-75b4-431b-adb2-eb6b9e546017',
  name: 'General Admission',
  code: 'GENERAL-ADMISSION',
  description: 'Default ticket product for integration-safe tests.',
  status: 'draft',
  deliveryType: 'digital_pdf',
  availableQuantity: 100,
  additionalInfo: {
    category: 'standard',
  },
  salesStartsAt: new Date('2026-01-01T10:00:00.000Z'),
  salesEndsAt: new Date('2026-01-02T10:00:00.000Z'),
  maxValidationCount: 1,
  isSingleUse: true,
  validFrom: new Date('2026-01-10T10:00:00.000Z'),
  validUntil: new Date('2026-01-11T10:00:00.000Z'),
  validationRules: {
    entryGate: 'main',
  },
  createdAt: new Date('2026-01-01T09:00:00.000Z'),
  updatedAt: new Date('2026-01-01T09:30:00.000Z'),
});

export const createTicketProductEntityProps = (): TicketProductEntityProps => {
  const ticketProductData = createTicketProductData();

  return {
    id: ticketProductData.id as string,
    tenantId: ticketProductData.tenantId as string,
    eventId: ticketProductData.eventId as string,
    ticketTemplateId: ticketProductData.ticketTemplateId as string | null,
    name: ticketProductData.name as string,
    code: ticketProductData.code as string,
    description: ticketProductData.description as string | null,
    status: ticketProductData.status as TicketProductEntityProps['status'],
    deliveryType:
      ticketProductData.deliveryType as TicketProductEntityProps['deliveryType'],
    availableQuantity: ticketProductData.availableQuantity as number,
    additionalInfo:
      ticketProductData.additionalInfo as TicketProductEntityProps['additionalInfo'],
    salesStartsAt: ticketProductData.salesStartsAt as Date | null,
    salesEndsAt: ticketProductData.salesEndsAt as Date | null,
    maxValidationCount: ticketProductData.maxValidationCount as number,
    isSingleUse: ticketProductData.isSingleUse as boolean,
    validFrom: ticketProductData.validFrom as Date | null,
    validUntil: ticketProductData.validUntil as Date | null,
    validationRules:
      ticketProductData.validationRules as TicketProductEntityProps['validationRules'],
    createdAt: ticketProductData.createdAt as Date,
    updatedAt: ticketProductData.updatedAt as Date,
  };
};

export const createTicketProduct = (): TicketProduct =>
  createTicketProductBuilder().build();

export const createTicketProductEntity = (): TicketProductEntity =>
  createTicketProductEntityBuilder().build();

export const createTicketProductEntityBuilder =
  (): IBuilder<TicketProductEntity> =>
    TicketProductEntity.builder()
      .id('de305d54-75b4-431b-adb2-eb6b9e546014')
      .tenantId('de305d54-75b4-431b-adb2-eb6b9e546015')
      .eventId('de305d54-75b4-431b-adb2-eb6b9e546016')
      .ticketTemplateId('de305d54-75b4-431b-adb2-eb6b9e546017')
      .name('General Admission')
      .code('GENERAL-ADMISSION')
      .description('Default ticket product for integration-safe tests.')
      .status('draft')
      .deliveryType('digital_pdf')
      .availableQuantity(100)
      .additionalInfo({
        category: 'standard',
      })
      .salesStartsAt(new Date('2026-01-01T10:00:00.000Z'))
      .salesEndsAt(new Date('2026-01-02T10:00:00.000Z'))
      .maxValidationCount(1)
      .isSingleUse(true)
      .validFrom(new Date('2026-01-10T10:00:00.000Z'))
      .validUntil(new Date('2026-01-11T10:00:00.000Z'))
      .validationRules({
        entryGate: 'main',
      })
      .createdAt(new Date('2026-01-01T09:00:00.000Z'))
      .updatedAt(new Date('2026-01-01T09:30:00.000Z'));

export const createTicketProductBuilder = (): IBuilder<TicketProduct> =>
  TicketProduct.build()
    .id('de305d54-75b4-431b-adb2-eb6b9e546014')
    .tenantId('de305d54-75b4-431b-adb2-eb6b9e546015')
    .eventId('de305d54-75b4-431b-adb2-eb6b9e546016')
    .ticketTemplateId('de305d54-75b4-431b-adb2-eb6b9e546017')
    .name('General Admission')
    .code('GENERAL-ADMISSION')
    .description('Default ticket product for integration-safe tests.')
    .status('draft')
    .deliveryType('digital_pdf')
    .availableQuantity(100)
    .additionalInfo({
      category: 'standard',
    })
    .salesStartsAt(new Date('2026-01-01T10:00:00.000Z'))
    .salesEndsAt(new Date('2026-01-02T10:00:00.000Z'))
    .maxValidationCount(1)
    .isSingleUse(true)
    .validFrom(new Date('2026-01-10T10:00:00.000Z'))
    .validUntil(new Date('2026-01-11T10:00:00.000Z'))
    .validationRules({
      entryGate: 'main',
    })
    .createdAt(new Date('2026-01-01T09:00:00.000Z'))
    .updatedAt(new Date('2026-01-01T09:30:00.000Z'));

export const loadCreateTicketProductRequest = async (): Promise<object> =>
  loadJsonResource(
    'ticket-product/create/adapter/create-ticket-product.request.json',
  );

export const loadCreateTicketProductResponse = async (): Promise<object> =>
  loadJsonResource(
    'ticket-product/create/adapter/create-ticket-product.response.json',
  );
