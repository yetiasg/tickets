import { Builder, IBuilder } from 'builder-pattern';

import { TicketProductDeliveryType } from '../../core/domain/ticket-product-delivery-type';
import { TicketProductMetadataObject } from '../../core/domain/ticket-product-metadata-value';
import { TicketProductStatus } from '../../core/domain/ticket-product-status';

export class TicketProductResponseDto {
  public readonly id!: string;
  public readonly tenantId!: string;
  public readonly eventId!: string;
  public readonly ticketTemplateId!: string | null;
  public readonly name!: string;
  public readonly code!: string;
  public readonly description!: string | null;
  public readonly status!: TicketProductStatus;
  public readonly deliveryType!: TicketProductDeliveryType;
  public readonly availableQuantity!: number;
  public readonly additionalInfo!: TicketProductMetadataObject | null;
  public readonly salesStartsAt!: string | null;
  public readonly salesEndsAt!: string | null;
  public readonly maxValidationCount!: number;
  public readonly isSingleUse!: boolean;
  public readonly validFrom!: string | null;
  public readonly validUntil!: string | null;
  public readonly validationRules!: TicketProductMetadataObject | null;
  public readonly createdAt!: string;
  public readonly updatedAt!: string;

  static builder(
    props?: Partial<TicketProductResponseDto>,
  ): IBuilder<TicketProductResponseDto> {
    return Builder(TicketProductResponseDto, props);
  }

  toBuilder(): IBuilder<TicketProductResponseDto> {
    return TicketProductResponseDto.builder(structuredClone(this));
  }
}
