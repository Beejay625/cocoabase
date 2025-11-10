import { type Address } from 'viem';

export interface DataListing {
  id: bigint;
  seller: Address;
  dataType: string;
  price: bigint;
  description: string;
  status: 'listed' | 'sold' | 'cancelled';
  createdAt: bigint;
  txHash: string;
}

export function listData(
  seller: Address,
  dataType: string,
  price: bigint,
  description: string
): DataListing {
  return {
    id: BigInt(Date.now()),
    seller,
    dataType,
    price,
    description,
    status: 'listed',
    createdAt: BigInt(Date.now()),
    txHash: '',
  };
}

export function purchaseData(
  listing: DataListing,
  buyer: Address
): DataListing | null {
  if (listing.status !== 'listed') return null;
  return {
    ...listing,
    status: 'sold',
  };
}

export function cancelListing(
  listing: DataListing,
  seller: Address
): DataListing | null {
  if (listing.seller.toLowerCase() !== seller.toLowerCase()) return null;
  if (listing.status !== 'listed') return null;
  return {
    ...listing,
    status: 'cancelled',
  };
}

export function getAvailableListings(listings: DataListing[]): DataListing[] {
  return listings.filter((l) => l.status === 'listed');
}
