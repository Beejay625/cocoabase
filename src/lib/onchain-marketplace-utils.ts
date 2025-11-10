import { type Address } from 'viem';

/**
 * Onchain marketplace utilities
 * List, buy, and sell NFTs and tokens
 */

export interface MarketplaceListing {
  id: bigint;
  seller: Address;
  tokenAddress: Address;
  tokenId: bigint;
  price: bigint;
  currency: Address;
  active: boolean;
}

export interface MarketplaceOffer {
  id: bigint;
  buyer: Address;
  listingId: bigint;
  amount: bigint;
  expiresAt: number;
}

/**
 * Calculate marketplace fee
 */
export function calculateMarketplaceFee(
  price: bigint,
  feePercent: number = 2.5
): bigint {
  return (price * BigInt(Math.floor(feePercent * 100))) / BigInt(10000);
}

