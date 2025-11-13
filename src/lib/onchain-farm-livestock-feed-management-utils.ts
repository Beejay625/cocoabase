import { type Address } from 'viem';

/**
 * Onchain farm livestock feed management utilities
 * Feed record creation and verification
 */

export interface FeedRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  feedType: string;
  amount: bigint;
  feedingDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createFeedRecord(
  address: Address,
  animalId: string,
  feedType: string,
  amount: bigint,
  feedingDate: bigint
): FeedRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    feedType,
    amount,
    feedingDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

