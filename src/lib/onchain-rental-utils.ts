import { type Address } from 'viem';

/**
 * Onchain rental utilities
 * NFT and asset rental system
 */

export interface Rental {
  id: bigint;
  asset: Address;
  tokenId: bigint;
  lessor: Address;
  lessee: Address | null;
  pricePerDay: bigint;
  duration: bigint;
  active: boolean;
}

export function calculateRentalCost(
  pricePerDay: bigint,
  days: number
): bigint {
  return pricePerDay * BigInt(days);
}
