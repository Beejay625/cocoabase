import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain time lock utilities
 * Time lock creation on blockchain
 */

export interface TimeLock {
  id: string;
  animalId: string;
  lockedBy: Address;
  lockAmount: bigint;
  unlockTime: bigint;
  lockDate: bigint;
  unlocked: boolean;
  timestamp: bigint;
}

export function createTimeLock(
  address: Address,
  animalId: string,
  lockAmount: bigint,
  unlockTime: bigint,
  lockDate: bigint
): TimeLock {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    lockedBy: address,
    lockAmount,
    unlockTime,
    lockDate,
    unlocked: false,
    timestamp: BigInt(Date.now()),
  };
}

