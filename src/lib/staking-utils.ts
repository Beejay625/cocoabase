import { type Address } from 'viem';

/**
 * Staking utilities
 * Stake tokens, calculate rewards, and manage positions
 */

export interface StakingPosition {
  staker: Address;
  amount: bigint;
  startTime: number;
  lockPeriod: number;
  rewardRate: number;
  claimedRewards: bigint;
}

export interface StakingReward {
  positionId: bigint;
  amount: bigint;
  timestamp: number;
}

/**
 * Calculate staking rewards
 */
export function calculateStakingReward(
  amount: bigint,
  rewardRate: number,
  duration: number
): bigint {
  const dailyRate = rewardRate / 365;
  return (amount * BigInt(Math.floor(dailyRate * duration * 10000))) / BigInt(10000);
}

/**
 * Check if position can be unstaked
 */
export function canUnstake(position: StakingPosition): boolean {
  const elapsed = Date.now() - position.startTime;
  return elapsed >= position.lockPeriod * 1000;
}

/**
 * Calculate APY from reward rate
 */
export function calculateStakingAPY(rewardRate: number): number {
  return rewardRate * 100;
}

/**
 * Calculate total rewards for position
 */
export function calculateTotalRewards(position: StakingPosition): bigint {
  const duration = Math.floor((Date.now() - position.startTime) / (1000 * 60 * 60 * 24));
  return calculateStakingReward(position.amount, position.rewardRate, duration);
}

/**
 * Calculate pending rewards
 */
export function calculatePendingRewards(position: StakingPosition): bigint {
  const total = calculateTotalRewards(position);
  return total > position.claimedRewards ? total - position.claimedRewards : BigInt(0);
}

