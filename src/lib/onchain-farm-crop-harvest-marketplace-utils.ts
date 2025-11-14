import { type Address } from 'viem';

/**
 * Onchain farm crop harvest marketplace utilities
 * Marketplace listing creation on blockchain
 */

export interface MarketplaceListing {
  id: string;
  harvestId: string;
  seller: Address;
  price: bigint;
  quantity: bigint;
  listingDate: bigint;
  description: string;
  sold: boolean;
  timestamp: bigint;
}

export function createMarketplaceListing(
  seller: Address,
  harvestId: string,
  price: bigint,
  quantity: bigint,
  listingDate: bigint,
  description: string
): MarketplaceListing {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    seller,
    price,
    quantity,
    listingDate,
    description,
    sold: false,
    timestamp: BigInt(Date.now()),
  };
}

