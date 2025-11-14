import { type Address } from 'viem';

export interface CarbonOffset {
  id: string;
  offsetId: bigint;
  carbonAmount: bigint;
  pricePerTon: bigint;
  seller: Address;
  buyer?: Address;
  listingDate: bigint;
  sold: boolean;
  verified: boolean;
}

export function createCarbonOffset(
  address: Address,
  carbonAmount: bigint,
  pricePerTon: bigint
): CarbonOffset {
  return {
    id: `${Date.now()}-${Math.random()}`,
    offsetId: BigInt(0),
    carbonAmount,
    pricePerTon,
    seller: address,
    listingDate: BigInt(Date.now()),
    sold: false,
    verified: false,
  };
}
