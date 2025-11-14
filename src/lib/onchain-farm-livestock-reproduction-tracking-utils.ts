import { type Address } from 'viem';

export interface ReproductionCycle {
  id: string;
  livestockId: bigint;
  expectedBirthDate: bigint;
  breeder: Address;
  completed: boolean;
}

export function createReproductionCycle(
  address: Address,
  livestockId: bigint,
  expectedBirthDate: bigint
): ReproductionCycle {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    expectedBirthDate,
    breeder: address,
    completed: false,
  };
}
