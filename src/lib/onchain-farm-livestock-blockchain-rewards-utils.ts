import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain rewards utilities
 * Reward record creation on blockchain
 */

export interface RewardRecord {
  id: string;
  animalId: string;
  createdBy: Address;
  rewardType: string;
  rewardAmount: bigint;
  rewardDate: bigint;
  reason: string;
  claimed: boolean;
  timestamp: bigint;
}

export function createRewardRecord(
  address: Address,
  animalId: string,
  rewardType: string,
  rewardAmount: bigint,
  rewardDate: bigint,
  reason: string
): RewardRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    createdBy: address,
    rewardType,
    rewardAmount,
    rewardDate,
    reason,
    claimed: false,
    timestamp: BigInt(Date.now()),
  };
}

