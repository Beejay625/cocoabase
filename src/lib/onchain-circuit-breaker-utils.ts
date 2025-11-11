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

export function checkCircuitBreaker(
  breaker: CircuitBreaker,
  amount: bigint
): { breaker: CircuitBreaker; allowed: boolean } {
  const newAmount = breaker.currentAmount + amount;
  const tripped = newAmount >= breaker.threshold;
  return {
    breaker: {
      ...breaker,
      currentAmount: newAmount,
      tripped,
    },
    allowed: !tripped,
  };
}

export function resetCircuitBreaker(breaker: CircuitBreaker): CircuitBreaker {
  return {
    ...breaker,
    currentAmount: BigInt(0),
    tripped: false,
  };
}
