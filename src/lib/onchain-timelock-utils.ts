import { type Address } from 'viem';

export interface Timelock {
  id: bigint;
  target: Address;
  value: bigint;
  data: string;
  eta: bigint;
  executed: boolean;
}

export function createTimelock(
  target: Address,
  value: bigint,
  data: string,
  eta: bigint
): Timelock {
  return {
    id: BigInt(0),
    target,
    value,
    data,
    eta,
    executed: false,
  };
}

export function canExecute(timelock: Timelock, currentTime: bigint): boolean {
  return !timelock.executed && currentTime >= timelock.eta;
}

export function executeTimelock(timelock: Timelock): Timelock {
  return {
    ...timelock,
    executed: true,
  };
}

export function getTimeUntilExecution(
  timelock: Timelock,
  currentTime: bigint
): bigint {
  if (timelock.executed || currentTime >= timelock.eta) return BigInt(0);
  return timelock.eta - currentTime;
}
