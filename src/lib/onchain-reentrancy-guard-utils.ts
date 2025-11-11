import { type Address } from 'viem';

export interface ReentrancyGuard {
  id: bigint;
  contract: Address;
  locked: boolean;
  lockCount: bigint;
}

export function createReentrancyGuard(contract: Address): ReentrancyGuard {
  return {
    id: BigInt(0),
    contract,
    locked: false,
    lockCount: BigInt(0),
  };
}

export function lock(guard: ReentrancyGuard): ReentrancyGuard | null {
  if (guard.locked) return null;
  return {
    ...guard,
    locked: true,
    lockCount: guard.lockCount + BigInt(1),
  };
}

export function unlock(guard: ReentrancyGuard): ReentrancyGuard {
  return {
    ...guard,
    locked: false,
  };
}

export function isLocked(guard: ReentrancyGuard): boolean {
  return guard.locked;
}
