import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain snapshot utilities
 * Snapshot creation on blockchain
 */

export interface Snapshot {
  id: string;
  harvestId: string;
  takenBy: Address;
  snapshotHash: string;
  snapshotDate: bigint;
  blockNumber: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createSnapshot(
  address: Address,
  harvestId: string,
  snapshotHash: string,
  snapshotDate: bigint,
  blockNumber: bigint
): Snapshot {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    takenBy: address,
    snapshotHash,
    snapshotDate,
    blockNumber,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

