import { type Address } from 'viem';

/**
 * Onchain farm inventory management utilities
 * Inventory item creation and quantity management
 */

export interface InventoryItem {
  id: string;
  itemName: string;
  owner: Address;
  category: string;
  quantity: bigint;
  unitPrice: bigint;
  timestamp: bigint;
}

export function createInventoryItem(
  address: Address,
  itemName: string,
  category: string,
  quantity: bigint,
  unitPrice: bigint
): InventoryItem {
  return {
    id: `${Date.now()}-${Math.random()}`,
    itemName,
    owner: address,
    category,
    quantity,
    unitPrice,
    timestamp: BigInt(Date.now()),
  };
}

