import { type Address } from 'viem';

/**
 * Onchain farm livestock movement utilities
 * Movement record creation and verification
 */

export interface LivestockMovement {
  id: string;
  animalId: string;
  recordedBy: Address;
  fromLocation: string;
  toLocation: string;
  movementDate: bigint;
  reason: string;
  verified: boolean;
  timestamp: bigint;
}

export function createMovementRecord(
  address: Address,
  animalId: string,
  fromLocation: string,
  toLocation: string,
  movementDate: bigint,
  reason: string
): LivestockMovement {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    fromLocation,
    toLocation,
    movementDate,
    reason,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

