import { type Address } from 'viem';

export interface CircuitBreaker {
  id: bigint;
  contract: Address;
  threshold: bigint;
  currentAmount: bigint;
  tripped: boolean;
}

export function createCircuitBreaker(
  contract: Address,
  threshold: bigint
): CircuitBreaker {
  return {
    id: BigInt(0),
    contract,
    threshold,
    currentAmount: BigInt(0),
    tripped: false,
  };
}

