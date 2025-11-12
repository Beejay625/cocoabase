import { type Address } from 'viem';

export interface MarketplaceListing {
  id: bigint;
  seller: Address;
  product: string;
  price: bigint;
  quantity: bigint;
  active: boolean;
}

export function createListing(
  seller: Address,
  product: string,
  price: bigint,
  quantity: bigint
): MarketplaceListing {
  return {
    id: BigInt(0),
    seller,
    product,
    price,
    quantity,
    active: true,
  };
}

export function purchaseListing(
  listing: MarketplaceListing,
  buyer: Address,
  quantity: bigint
): MarketplaceListing | null {
  if (!listing.active || quantity > listing.quantity) return null;
  return {
    ...listing,
    quantity: listing.quantity - quantity,
    active: listing.quantity - quantity > BigInt(0),
  };
}

export function calculateTotalValue(listings: MarketplaceListing[]): bigint {
  return listings
    .filter((l) => l.active)
    .reduce((total, l) => total + l.price * l.quantity, BigInt(0));
}
