import { type Address } from 'viem';

/**
 * Onchain farm crop harvest warehouse management utilities
 * Warehouse record creation on blockchain
 */

export interface WarehouseRecord {
  id: string;
  harvestId: string;
  recordedBy: Address;
  warehouseLocation: string;
  storageType: string;
  quantity: bigint;
  entryDate: bigint;
  timestamp: bigint;
}

export function createWarehouseRecord(
  address: Address,
  harvestId: string,
  warehouseLocation: string,
  storageType: string,
  quantity: bigint,
  entryDate: bigint
): WarehouseRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    recordedBy: address,
    warehouseLocation,
    storageType,
    quantity,
    entryDate,
    timestamp: BigInt(Date.now()),
  };
}

