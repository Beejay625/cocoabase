import { type Address } from 'viem';

export interface MarketplaceListing {
  id: bigint;
  seller: Address;
  product: string;
  price: bigint;
  quantity: bigint;
  status: 'active' | 'sold' | 'cancelled';
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
    status: 'active',
  };
}
