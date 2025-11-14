import { type Address } from 'viem';

/**
 * Onchain farm livestock quarantine utilities
 * Quarantine record creation and release
 */

export interface QuarantineRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  quarantineStartDate: bigint;
  quarantineEndDate: bigint;
  reason: string;
  location: string;
  released: boolean;
  timestamp: bigint;
}

export function createQuarantineRecord(
  address: Address,
  animalId: string,
  quarantineStartDate: bigint,
  quarantineEndDate: bigint,
  reason: string,
  location: string
): QuarantineRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    quarantineStartDate,
    quarantineEndDate,
    reason,
    location,
    released: false,
    timestamp: BigInt(Date.now()),
  };
}

