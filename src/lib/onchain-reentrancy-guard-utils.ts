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

