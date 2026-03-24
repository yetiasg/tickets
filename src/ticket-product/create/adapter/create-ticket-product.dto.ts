import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
} from 'class-validator';

import type { TicketProductDeliveryType } from '../../core/domain/ticket-product-delivery-type';
import type { TicketProductMetadataObject } from '../../core/domain/ticket-product-metadata-value';

export class CreateTicketProductDto {
  @IsUUID('4')
  public readonly tenantId!: string;

  @IsUUID('4')
  public readonly eventId!: string;

  @IsOptional()
  @IsUUID('4')
  public readonly ticketTemplateId!: string | null;

  @IsString()
  @IsNotEmpty()
  public readonly name!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9-]+$/)
  public readonly code!: string;

  @IsOptional()
  @IsString()
  public readonly description!: string | null;

  @IsString()
  @IsNotEmpty()
  public readonly deliveryType!: TicketProductDeliveryType;

  @IsInt()
  @Min(0)
  public readonly availableQuantity!: number;

  @IsOptional()
  @IsObject()
  public readonly additionalInfo!: TicketProductMetadataObject | null;

  @IsOptional()
  @IsDateString()
  public readonly salesStartsAt!: string | null;

  @IsOptional()
  @IsDateString()
  public readonly salesEndsAt!: string | null;

  @IsInt()
  @Min(1)
  public readonly maxValidationCount!: number;

  @IsBoolean()
  public readonly isSingleUse!: boolean;

  @IsOptional()
  @IsDateString()
  public readonly validFrom!: string | null;

  @IsOptional()
  @IsDateString()
  public readonly validUntil!: string | null;

  @IsOptional()
  @IsObject()
  public readonly validationRules!: TicketProductMetadataObject | null;
}
