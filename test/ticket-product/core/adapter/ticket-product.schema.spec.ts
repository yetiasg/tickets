import { getTableConfig } from 'drizzle-orm/pg-core';

import { ticketProductsTable } from '../../../../src/ticket-product/core/adapter/ticket-product.schema';
import {
  TICKET_PRODUCTS_REQUIRED_COLUMN_NAMES,
  TICKET_PRODUCTS_TABLE_NAME,
  TICKET_PRODUCTS_UNIQUE_INDEX_NAME,
} from '../../ticket-product.helper';

describe('ticketProductsTable', (): void => {
  it('should expose ticket products table definition when schema module is imported', (): void => {
    const ticketProductsTableConfig = getTableConfig(ticketProductsTable);
    const ticketProductsTableColumnNames =
      ticketProductsTableConfig.columns.map((column): string => column.name);
    const ticketProductsTableIndexNames = ticketProductsTableConfig.indexes.map(
      (tableIndex): string => tableIndex.config.name ?? '',
    );

    expect(ticketProductsTableConfig.name).toBe(TICKET_PRODUCTS_TABLE_NAME);
    expect(ticketProductsTableColumnNames).toEqual(
      expect.arrayContaining(TICKET_PRODUCTS_REQUIRED_COLUMN_NAMES),
    );
    expect(ticketProductsTableIndexNames).toContain(
      TICKET_PRODUCTS_UNIQUE_INDEX_NAME,
    );
  });
});
