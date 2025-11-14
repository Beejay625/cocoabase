import { type Address } from 'viem';

export interface SelectionDecision {
  id: string;
  parent1Id: bigint;
  parent2Id: bigint;
  selectionCriteria: string;
  expectedOutcome: bigint;
  selector: Address;
}

export function createSelectionDecision(
  address: Address,
  parent1Id: bigint,
  parent2Id: bigint,
  selectionCriteria: string,
  expectedOutcome: bigint
): SelectionDecision {
  return {
    id: `${Date.now()}-${Math.random()}`,
    parent1Id,
    parent2Id,
    selectionCriteria,
    expectedOutcome,
    selector: address,
  };
}

