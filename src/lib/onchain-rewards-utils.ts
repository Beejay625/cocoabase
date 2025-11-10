import { type Address } from 'viem';

/**
 * Onchain rewards system utilities
 * Reward points and token distribution
 */

export interface Reward {
  recipient: Address;
  amount: bigint;
  token: Address;
  reason: string;
  timestamp: bigint;
  txHash: string;
}

export interface RewardTier {
  tier: number;
  minPoints: bigint;
  multiplier: number;
  benefits: string[];
}

export function calculateRewardAmount(
  baseAmount: bigint,
  multiplier: number
): bigint {
  return (baseAmount * BigInt(Math.floor(multiplier * 100))) / BigInt(100);
}

export function getRewardTier(
  points: bigint,
  tiers: RewardTier[]
): RewardTier | null {
  return tiers.find(tier => points >= tier.minPoints) || null;
}

export function calculatePointsReward(
  action: string,
  basePoints: bigint
): bigint {
  const multipliers: Record<string, number> = {
    mint: 10,
    harvest: 20,
    stake: 5,
    vote: 3,
  };
  const multiplier = multipliers[action] || 1;
  return basePoints * BigInt(multiplier);
}

export function distributeRewards(
  recipients: Address[],
  totalAmount: bigint
): Map<Address, bigint> {
  const share = totalAmount / BigInt(recipients.length);
  const rewards = new Map<Address, bigint>();
  recipients.forEach(addr => rewards.set(addr, share));
  return rewards;
}

export function validateReward(
  amount: bigint,
  minAmount: bigint = BigInt(0)
): boolean {
  return amount > minAmount;
}
