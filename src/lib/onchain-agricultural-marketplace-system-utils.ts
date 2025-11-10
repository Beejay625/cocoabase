import { type Address } from 'viem';

export interface MarketplaceListing {
  id: bigint;
  seller: Address;
  productType: string;
  quantity: bigint;
  price: bigint;
  listingDate: bigint;
  status: 'active' | 'sold' | 'cancelled';
  txHash: string;
}

export function createListing(
  seller: Address,
  productType: string,
  quantity: bigint,
  price: bigint
): MarketplaceListing {
  return {
    id: BigInt(Date.now()),
    seller,
    productType,
    quantity,
    price,
    listingDate: BigInt(Date.now()),
    status: 'active',
    txHash: '',
  };
}

export function purchaseListing(
  listing: MarketplaceListing,
  buyer: Address
): MarketplaceListing | null {
  if (listing.status !== 'active') return null;
  return {
    ...listing,
    status: 'sold',
  };
}

export function getActiveListings(
  listings: MarketplaceListing[]
): MarketplaceListing[] {
  return listings.filter((l) => l.status === 'active');
}

export function calculateTotalValue(
  listings: MarketplaceListing[]
): bigint {
  return listings
    .filter((l) => l.status === 'active')
    .reduce((total, l) => total + (l.quantity * l.price), BigInt(0));
}
