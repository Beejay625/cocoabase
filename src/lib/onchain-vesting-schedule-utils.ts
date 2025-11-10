import { type Address } from 'viem';

export interface VestingSchedule {
  id: bigint;
  beneficiary: Address;
  token: Address;
  totalAmount: bigint;
  startTime: bigint;
  duration: bigint;
  cliff: bigint;
  released: bigint;
}

export function createVestingSchedule(
  beneficiary: Address,
  token: Address,
  totalAmount: bigint,
  startTime: bigint,
  duration: bigint,
  cliff: bigint
): VestingSchedule {
  return {
    id: BigInt(0),
    beneficiary,
    token,
    totalAmount,
    startTime,
    duration,
    cliff,
    released: BigInt(0),
  };
}

export function releaseVested(
  schedule: VestingSchedule,
  currentTime: bigint
): { schedule: VestingSchedule; released: bigint } {
  if (currentTime < schedule.startTime + schedule.cliff) {
    return { schedule, released: BigInt(0) };
  }
  const elapsed = currentTime - schedule.startTime;
  const vestedAmount = (schedule.totalAmount * elapsed) / schedule.duration;
  const releasable = vestedAmount > schedule.released
    ? vestedAmount - schedule.released
    : BigInt(0);
  return {
    schedule: {
      ...schedule,
      released: schedule.released + releasable,
    },
    released: releasable,
  };
}

export function calculateVestedAmount(
  schedule: VestingSchedule,
  currentTime: bigint
): bigint {
  if (currentTime < schedule.startTime + schedule.cliff) return BigInt(0);
  const elapsed = currentTime - schedule.startTime;
  if (elapsed >= schedule.duration) return schedule.totalAmount;
  return (schedule.totalAmount * elapsed) / schedule.duration;
}
