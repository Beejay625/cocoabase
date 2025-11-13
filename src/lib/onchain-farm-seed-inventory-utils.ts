import { type Address } from 'viem';

export interface SeedInventory {
  id: bigint;
  owner: Address;
  seedType: string;
  quantity: bigint;
  expiryDate: bigint;
  timestamp: bigint;
}

export function createSeedInventory(
  owner: Address,
  seedType: string,
  quantity: bigint,
  expiryDate: bigint
): SeedInventory {
  return {
    id: BigInt(Date.now()),
    owner,
    seedType,
    quantity,
    expiryDate,
    timestamp: BigInt(Date.now()),
  };
}

export function getTotalQuantity(
  inventory: SeedInventory[]
): bigint {
  return inventory.reduce((total, i) => total + i.quantity, BigInt(0));
}

export function checkExpiry(
  inventory: SeedInventory,
  currentTime: bigint
): boolean {
  return currentTime > inventory.expiryDate;
}
