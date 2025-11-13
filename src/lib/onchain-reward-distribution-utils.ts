import { type Address } from 'viem';

/**
 * Onchain reward distribution utilities
 * Reward distribution system
 */

export interface RewardDistribution {
  id: bigint;
  totalAmount: bigint;
  distributed: bigint;
  recipients: Address[];
}

export function createRewardDistribution(
  totalAmount: bigint,
  recipients: Address[]
): RewardDistribution {
  return {
    id: BigInt(0),
    totalAmount,
    distributed: BigInt(0),
    recipients,
  };
}

export function distributeReward(
  distribution: RewardDistribution,
  recipient: Address,
  amount: bigint
): RewardDistribution | null {
  if (!distribution.recipients.includes(recipient)) return null;
  if (distribution.distributed + amount > distribution.totalAmount) return null;
  return {
    ...distribution,
    distributed: distribution.distributed + amount,
  };
}

export function calculateRemainingRewards(
  distribution: RewardDistribution
): bigint {
  return distribution.totalAmount - distribution.distributed;
}
