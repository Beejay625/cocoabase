import { type Address } from 'viem';

export interface PruningRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  treesPruned: bigint;
  pruningDate: bigint;
  pruningType: string;
  pruner: Address;
}

export function createPruningRecord(
  address: Address,
  plantationId: bigint,
  treesPruned: bigint,
  pruningType: string
): PruningRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    treesPruned,
    pruningDate: BigInt(Date.now()),
    pruningType,
    pruner: address,
  };
}

