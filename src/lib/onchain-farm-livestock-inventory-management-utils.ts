import { type Address } from 'viem';

/**
 * Onchain farm livestock inventory management utilities
 * Inventory record creation on blockchain
 */

export interface InventoryRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  location: string;
  status: string;
  recordDate: bigint;
  timestamp: bigint;
}

export function createInventoryRecord(
  address: Address,
  animalId: string,
  location: string,
  status: string,
  recordDate: bigint
): InventoryRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    location,
    status,
    recordDate,
    timestamp: BigInt(Date.now()),
  };
}

