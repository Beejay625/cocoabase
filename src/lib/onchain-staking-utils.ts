import { type Address } from 'viem';

/**
 * Onchain staking utilities
 * Staking pools and reward calculations
 */

export interface StakingPool {
  address: Address;
  token: Address;
  totalStaked: bigint;
  rewardRate: bigint;
  lockPeriod: number;
}

export interface StakingPosition {
  user: Address;
  amount: bigint;
  startTime: bigint;
  rewards: bigint;
}

export function calculateStakingRewards(
  position: StakingPosition,
  pool: StakingPool,
  currentTime: bigint
): bigint {
  const stakingDuration = currentTime - position.startTime;
  return (position.amount * pool.rewardRate * stakingDuration) / BigInt(1000000);
}

export function canUnstake(
  position: StakingPosition,
  pool: StakingPool,
  currentTime: bigint
): boolean {
  return currentTime >= position.startTime + BigInt(pool.lockPeriod * 1000);
}
