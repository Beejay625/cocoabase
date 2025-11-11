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
