import { type Address } from 'viem';

/**
 * DeFi integration utilities
 * Lending, staking, and yield farming operations
 */

export interface LendingPool {
  address: Address;
  apy: number;
  totalLiquidity: bigint;
  tokenAddress: Address;
}

export interface StakingPool {
  address: Address;
  rewardRate: number;
  totalStaked: bigint;
  lockPeriod: number;
}

/**
 * Calculate APY from interest rate
 */
export function calculateAPY(
  interestRate: number,
  compoundingFrequency: number = 365
): number {
  return (1 + interestRate / compoundingFrequency) ** compoundingFrequency - 1;
}

/**
 * Calculate staking rewards
 */
export function calculateStakingRewards(
  amount: bigint,
  rewardRate: number,
  days: number
): bigint {
  const dailyRate = rewardRate / 365;
  return (amount * BigInt(Math.floor(dailyRate * days * 10000))) / BigInt(10000);
}

/**
 * Calculate loan interest
 */
export function calculateLoanInterest(
  principal: bigint,
  rate: number,
  days: number
): bigint {
  return (principal * BigInt(Math.floor(rate * days * 100))) / BigInt(36500);
}

