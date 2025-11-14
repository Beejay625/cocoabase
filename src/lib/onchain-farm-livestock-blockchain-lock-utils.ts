import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain lock utilities
 * Lock record creation on blockchain
 */

export interface LockRecord {
  id: string;
  animalId: string;
  lockedBy: Address;
  lockReason: string;
  lockDate: bigint;
  unlockDate: bigint;
  unlocked: boolean;
  timestamp: bigint;
}

export function createLockRecord(
  address: Address,
  animalId: string,
  lockReason: string,
  lockDate: bigint,
  unlockDate: bigint
): LockRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    lockedBy: address,
    lockReason,
    lockDate,
    unlockDate,
    unlocked: false,
    timestamp: BigInt(Date.now()),
  };
}

