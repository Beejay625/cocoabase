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
