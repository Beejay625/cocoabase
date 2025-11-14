import { type Address } from 'viem';

/**
 * Onchain farm livestock location tracking utilities
 * Location record creation on blockchain
 */

export interface LocationRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  latitude: number;
  longitude: number;
  locationDate: bigint;
  locationType: string;
  timestamp: bigint;
}

export function createLocationRecord(
  address: Address,
  animalId: string,
  latitude: number,
  longitude: number,
  locationDate: bigint,
  locationType: string
): LocationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    latitude,
    longitude,
    locationDate,
    locationType,
    timestamp: BigInt(Date.now()),
  };
}

