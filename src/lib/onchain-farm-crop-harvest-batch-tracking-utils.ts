import { type Address } from 'viem';

/**
 * Onchain farm crop harvest batch tracking utilities
 * Batch creation and updates
 */

export interface HarvestBatch {
  id: string;
  harvestId: string;
  createdBy: Address;
  batchNumber: string;
  quantity: bigint;
  batchDate: bigint;
  timestamp: bigint;
}

export function createBatch(
  address: Address,
  harvestId: string,
  batchNumber: string,
  quantity: bigint,
  batchDate: bigint
): HarvestBatch {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    batchNumber,
    quantity,
    batchDate,
    timestamp: BigInt(Date.now()),
  };
}

