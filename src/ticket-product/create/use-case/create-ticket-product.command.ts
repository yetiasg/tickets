import { Builder, IBuilder } from 'builder-pattern';

import { TicketProductDeliveryType } from '../../core/domain/ticket-product-delivery-type';
import { TicketProductMetadataObject } from '../../core/domain/ticket-product-metadata-value';

export class CreateTicketProductCommand {
  public readonly tenantId!: string;
  public readonly eventId!: string;
  public readonly ticketTemplateId!: string | null;
  public readonly name!: string;
  public readonly code!: string;
  public readonly description!: string | null;
  public readonly deliveryType!: TicketProductDeliveryType;
  public readonly availableQuantity!: number;
  public readonly additionalInfo!: TicketProductMetadataObject | null;
  public readonly salesStartsAt!: Date | null;
  public readonly salesEndsAt!: Date | null;
  public readonly maxValidationCount!: number;
  public readonly isSingleUse!: boolean;
  public readonly validFrom!: Date | null;
  public readonly validUntil!: Date | null;
  public readonly validationRules!: TicketProductMetadataObject | null;

  static builder(
    props?: Partial<CreateTicketProductCommand>,
  ): IBuilder<CreateTicketProductCommand> {
    return Builder(CreateTicketProductCommand, props);
  }

  toBuilder(): IBuilder<CreateTicketProductCommand> {
    return CreateTicketProductCommand.builder(structuredClone(this));
  }
}
