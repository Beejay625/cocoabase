import { type Address } from 'viem';

/**
 * Onchain farm livestock feed inventory utilities
 * Feed inventory creation on blockchain
 */

export interface FeedInventory {
  id: string;
  feedType: string;
  recordedBy: Address;
  quantity: bigint;
  location: string;
  recordDate: bigint;
  supplier: string;
  timestamp: bigint;
}

export function createFeedInventory(
  address: Address,
  feedType: string,
  quantity: bigint,
  location: string,
  recordDate: bigint,
  supplier: string
): FeedInventory {
  return {
    id: `${Date.now()}-${Math.random()}`,
    feedType,
    recordedBy: address,
    quantity,
    location,
    recordDate,
    supplier,
    timestamp: BigInt(Date.now()),
  };
}

