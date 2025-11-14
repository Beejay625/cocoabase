import { type Address } from 'viem';

export interface CostAnalysis {
  id: string;
  livestockId: bigint;
  currentCost: bigint;
  optimizedCost: bigint;
  savings: bigint;
  analyst: Address;
}

export function createCostAnalysis(
  address: Address,
  livestockId: bigint,
  currentCost: bigint,
  optimizedCost: bigint
): CostAnalysis {
  const savings = currentCost > optimizedCost ? currentCost - optimizedCost : 0n;
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    currentCost,
    optimizedCost,
    savings,
    analyst: address,
  };
}

