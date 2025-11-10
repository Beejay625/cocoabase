import { type Address } from 'viem';

/**
 * Onchain vesting utilities
 * Token vesting schedules and unlock calculations
 */

export interface VestingSchedule {
  beneficiary: Address;
  totalAmount: bigint;
  startTime: number;
  duration: number;
  cliff: number;
  released: bigint;
}

/**
 * Calculate vested amount
 */
export function calculateVestedAmount(schedule: VestingSchedule): bigint {
  if (Date.now() < schedule.startTime) return BigInt(0);
  if (Date.now() < schedule.startTime + schedule.cliff) return BigInt(0);
  
  const elapsed = Date.now() - schedule.startTime;
  const vested = (schedule.totalAmount * BigInt(elapsed)) / BigInt(schedule.duration);
  return vested > schedule.totalAmount ? schedule.totalAmount : vested;
}
