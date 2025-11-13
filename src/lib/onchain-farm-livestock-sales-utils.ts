import { type Address } from 'viem';

/**
 * Onchain farm livestock sales utilities
 * Livestock sale record creation and confirmation
 */

export interface LivestockSale {
  id: string;
  animalId: string;
  seller: Address;
  buyer: Address;
  salePrice: bigint;
  saleDate: bigint;
  confirmed: boolean;
  timestamp: bigint;
}

export function createSaleRecord(
  seller: Address,
  animalId: string,
  buyer: Address,
  salePrice: bigint,
  saleDate: bigint
): LivestockSale {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    seller,
    buyer,
    salePrice,
    saleDate,
    confirmed: false,
    timestamp: BigInt(Date.now()),
  };
}

