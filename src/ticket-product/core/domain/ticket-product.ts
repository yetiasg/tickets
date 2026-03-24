import { Builder, IBuilder } from 'builder-pattern';

import { TicketProductDeliveryType } from './ticket-product-delivery-type';
import { TicketProductMetadataObject } from './ticket-product-metadata-value';
import { TicketProductStatus } from './ticket-product-status';

export class TicketProduct {
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
  public readonly salesStartsAt!: Date | null;
  public readonly salesEndsAt!: Date | null;
  public readonly maxValidationCount!: number;
  public readonly isSingleUse!: boolean;
  public readonly validFrom!: Date | null;
  public readonly validUntil!: Date | null;
  public readonly validationRules!: TicketProductMetadataObject | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static build(props?: Partial<TicketProduct>): IBuilder<TicketProduct> {
    return Builder(TicketProduct, props);
  }

  toBuilder(): IBuilder<TicketProduct> {
    return TicketProduct.build(structuredClone(this));
  }
}
