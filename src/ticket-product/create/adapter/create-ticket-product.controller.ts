import { Body, Controller, Post } from '@nestjs/common';

import { TicketProductToTicketProductResponseDtoConverter } from '../../core/adapter/ticket-product-to-ticket-product-response.converter';
import { DescribeCreateTicketProduct } from '../../ticket-product.openapi';
import { CreateTicketProductCommandHandler } from '../use-case/create-ticket-product.command-handler';
import { CreateTicketProductDto } from './create-ticket-product.dto';
import { TicketProductResponseDto } from './create-ticket-product.response.dto';
import { CreateTicketProductDtoToCommandConverter } from './create-ticket-product-dto-to-command.converter';

@Controller('ticket-products')
export class CreateTicketProductController {
  constructor(
    private readonly createTicketProductCommandHandler: CreateTicketProductCommandHandler,
    private readonly createTicketProductDtoToCommandConverter: CreateTicketProductDtoToCommandConverter,
    private readonly ticketProductToTicketProductResponseDtoConverter: TicketProductToTicketProductResponseDtoConverter,
  ) {}

  @Post()
  @DescribeCreateTicketProduct()
  async createTicketProduct(
    @Body() requestDto: CreateTicketProductDto,
  ): Promise<TicketProductResponseDto> {
    const command =
      this.createTicketProductDtoToCommandConverter.convert(requestDto);
    const ticketProduct =
      await this.createTicketProductCommandHandler.handle(command);
    return this.ticketProductToTicketProductResponseDtoConverter.convert(
      ticketProduct,
    );
  }
}
