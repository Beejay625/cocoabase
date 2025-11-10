import { type Address } from 'viem';

/**
 * Onchain time-locked transfer utilities
 * Time-locked asset transfers and vesting
 */

export interface Timelock {
  id: bigint;
  from: Address;
  to: Address;
  amount: bigint;
  token: Address;
  unlockTime: bigint;
  locked: boolean;
  createdAt: bigint;
}

export function createTimelock(
  from: Address,
  to: Address,
  amount: bigint,
  token: Address,
  unlockTime: bigint
): Timelock {
  return {
    id: BigInt(0),
    from,
    to,
    amount,
    token,
    unlockTime,
    locked: true,
    createdAt: BigInt(Date.now()),
  };
}

export function isTimelockUnlocked(
  timelock: Timelock,
  currentTime: bigint
): boolean {
  return currentTime >= timelock.unlockTime && timelock.locked;
}

export function canReleaseTimelock(
  timelock: Timelock,
  releaser: Address,
  currentTime: bigint
): boolean {
  return (
    isTimelockUnlocked(timelock, currentTime) &&
    (releaser === timelock.to || releaser === timelock.from)
  );
}

export function calculateUnlockTime(
  lockDuration: number,
  startTime: bigint = BigInt(Date.now())
): bigint {
  return startTime + BigInt(lockDuration * 1000);
}

export function getTimeUntilUnlock(
  timelock: Timelock,
  currentTime: bigint
): bigint {
  if (currentTime >= timelock.unlockTime) return BigInt(0);
  return timelock.unlockTime - currentTime;
}

export function validateTimelockAmount(
  amount: bigint,
  minAmount: bigint = BigInt(0)
): boolean {
  return amount > minAmount;
}
