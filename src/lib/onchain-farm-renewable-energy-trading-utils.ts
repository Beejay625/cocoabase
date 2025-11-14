import { type Address } from 'viem';

export interface EnergyListing {
  id: string;
  listingId: bigint;
  energyAmount: bigint;
  pricePerUnit: bigint;
  seller: Address;
  buyer?: Address;
  listingDate: bigint;
  energyType: string;
  sold: boolean;
}

export function createEnergyListing(
  address: Address,
  energyAmount: bigint,
  pricePerUnit: bigint,
  energyType: string
): EnergyListing {
  return {
    id: `${Date.now()}-${Math.random()}`,
    listingId: BigInt(0),
    energyAmount,
    pricePerUnit,
    seller: address,
    listingDate: BigInt(Date.now()),
    energyType,
    sold: false,
  };
}
