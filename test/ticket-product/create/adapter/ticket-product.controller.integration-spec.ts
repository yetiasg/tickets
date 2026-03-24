import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

import { TicketProductRepository } from '../../../../src/ticket-product/core/domain/ticket-product.repository';
import { CreateTicketProductDto } from '../../../../src/ticket-product/create/adapter/create-ticket-product.dto';
import { createIntegrationContext } from '../../../test-lib/test.module';
import {
  TEST_CORRELATION_ID,
  TEST_TRACE_ID,
} from '../../../test-lib/testing.constants';
import {
  loadCreateTicketProductRequest,
  loadCreateTicketProductResponse,
  TICKET_PRODUCTS_ENDPOINT_PATH,
} from '../../ticket-product.helper';

describe('CreateTicketProductController [Integration]', (): void => {
  let ctx: INestApplication;
  let server: App;
  let ticketProductRepository: TicketProductRepository;

  beforeEach(async (): Promise<void> => {
    ctx = await createIntegrationContext();
    server = ctx.getHttpServer() as App;
    ticketProductRepository = ctx.get(TicketProductRepository);
  });

  afterEach(async (): Promise<void> => {
    await ctx.close();
  });

  it('createTicketProduct POST /v1/ticket-products', async (): Promise<void> => {
    const requestBody = await loadCreateTicketProductRequest();
    const expectedResponse = await loadCreateTicketProductResponse();

    const response = await request(server)
      .post(TICKET_PRODUCTS_ENDPOINT_PATH)
      .set('x-trace-id', TEST_TRACE_ID)
      .set('x-correlation-id', TEST_CORRELATION_ID)
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  it('persistTicketProduct POST /v1/ticket-products', async (): Promise<void> => {
    const requestBody =
      (await loadCreateTicketProductRequest()) as CreateTicketProductDto;

    const response = await request(server)
      .post(TICKET_PRODUCTS_ENDPOINT_PATH)
      .set('x-trace-id', TEST_TRACE_ID)
      .set('x-correlation-id', TEST_CORRELATION_ID)
      .send(requestBody);
    const responseBody = response.body as { id: string };
    const savedTicketProduct = await ticketProductRepository.findById(
      responseBody.id,
    );

    expect(response.status).toBe(201);
    expect(savedTicketProduct).not.toBeNull();
    expect(savedTicketProduct?.id).toBe(responseBody.id);
    expect(savedTicketProduct?.tenantId).toBe(requestBody.tenantId);
    expect(savedTicketProduct?.eventId).toBe(requestBody.eventId);
    expect(savedTicketProduct?.code).toBe(requestBody.code);
    expect(savedTicketProduct?.name).toBe(requestBody.name);
  });
});
