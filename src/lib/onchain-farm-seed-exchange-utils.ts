import { type Address } from 'viem';

export interface SeedListing {
  id: string;
  listingId: bigint;
  seedType: string;
  quantity: bigint;
  pricePerUnit: bigint;
  seller: Address;
  buyer?: Address;
  listingDate: bigint;
  quality: string;
  sold: boolean;
}

export function createSeedListing(
  address: Address,
  seedType: string,
  quantity: bigint,
  pricePerUnit: bigint,
  quality: string
): SeedListing {
  return {
    id: `${Date.now()}-${Math.random()}`,
    listingId: BigInt(0),
    seedType,
    quantity,
    pricePerUnit,
    seller: address,
    listingDate: BigInt(Date.now()),
    quality,
    sold: false,
  };
}
