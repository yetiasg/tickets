type TicketProductMetadataPrimitive = string | number | boolean | null;

export type TicketProductMetadataValue =
  | TicketProductMetadataPrimitive
  | TicketProductMetadataObject
  | TicketProductMetadataArray;

export interface TicketProductMetadataObject {
  readonly [key: string]: TicketProductMetadataValue;
}

export type TicketProductMetadataArray = readonly TicketProductMetadataValue[];
