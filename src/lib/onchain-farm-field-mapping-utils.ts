import { type Address } from 'viem';

/**
 * Onchain farm field mapping utilities
 * Field map creation and updates
 */

export interface FieldMap {
  id: string;
  fieldId: string;
  owner: Address;
  coordinates: string;
  area: bigint;
  soilType: string;
  timestamp: bigint;
}

export function createFieldMap(
  address: Address,
  fieldId: string,
  coordinates: string,
  area: bigint,
  soilType: string
): FieldMap {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    owner: address,
    coordinates,
    area,
    soilType,
    timestamp: BigInt(Date.now()),
  };
}

