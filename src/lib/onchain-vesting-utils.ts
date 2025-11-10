import { type Address } from 'viem';

/**
 * Onchain vesting utilities
 * Token vesting schedules and cliff periods
 */

export interface VestingSchedule {
  id: bigint;
  beneficiary: Address;
  token: Address;
  totalAmount: bigint;
  startTime: bigint;
  cliff: bigint;
  duration: bigint;
  released: bigint;
  revocable: boolean;
}

export function createVestingSchedule(
  beneficiary: Address,
  token: Address,
  totalAmount: bigint,
  startTime: bigint,
  cliff: bigint,
  duration: bigint,
  revocable: boolean = false
): VestingSchedule {
  return {
    id: BigInt(0),
    beneficiary,
    token,
    totalAmount,
    startTime,
    cliff,
    duration,
    released: BigInt(0),
    revocable,
  };
}

export function calculateVestedAmount(
  schedule: VestingSchedule,
  currentTime: bigint
): bigint {
  if (currentTime < schedule.startTime + schedule.cliff) {
    return BigInt(0);
  }
  if (currentTime >= schedule.startTime + schedule.duration) {
    return schedule.totalAmount;
  }
  const elapsed = currentTime - schedule.startTime;
  return (schedule.totalAmount * elapsed) / schedule.duration;
}

export function canReleaseVesting(
  schedule: VestingSchedule,
  currentTime: bigint
): boolean {
  const vested = calculateVestedAmount(schedule, currentTime);
  return vested > schedule.released;
}

export function calculateReleaseAmount(
  schedule: VestingSchedule,
  currentTime: bigint
): bigint {
  const vested = calculateVestedAmount(schedule, currentTime);
  return vested > schedule.released ? vested - schedule.released : BigInt(0);
}

export function isVestingCliffPassed(
  schedule: VestingSchedule,
  currentTime: bigint
): boolean {
  return currentTime >= schedule.startTime + schedule.cliff;
}

export function getVestingRemaining(
  schedule: VestingSchedule
): bigint {
  return schedule.totalAmount - schedule.released;
}
