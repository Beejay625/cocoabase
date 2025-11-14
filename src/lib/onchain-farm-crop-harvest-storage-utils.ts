import { type Address } from 'viem';

/**
 * Onchain farm crop harvest storage utilities
 * Storage record creation and retrieval
 */

export interface HarvestStorage {
  id: string;
  harvestId: string;
  storedBy: Address;
  storageLocation: string;
  quantity: bigint;
  storageDate: bigint;
  conditions: string;
  remainingQuantity: bigint;
  timestamp: bigint;
}

export function createStorageRecord(
  address: Address,
  harvestId: string,
  storageLocation: string,
  quantity: bigint,
  storageDate: bigint,
  conditions: string
): HarvestStorage {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    storedBy: address,
    storageLocation,
    quantity,
    storageDate,
    conditions,
    remainingQuantity: quantity,
    timestamp: BigInt(Date.now()),
  };
}

