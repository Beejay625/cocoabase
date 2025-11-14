import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain batch utilities
 * Batch record creation on blockchain
 */

export interface BatchRecord {
  id: string;
  harvestIds: string[];
  createdBy: Address;
  batchHash: string;
  batchDate: bigint;
  batchType: string;
  verified: boolean;
  timestamp: bigint;
}

export function createBatchRecord(
  address: Address,
  harvestIds: string[],
  batchHash: string,
  batchDate: bigint,
  batchType: string
): BatchRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestIds,
    createdBy: address,
    batchHash,
    batchDate,
    batchType,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

