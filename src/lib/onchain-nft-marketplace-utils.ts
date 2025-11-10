import { type Address } from 'viem';

/**
 * Onchain NFT marketplace utilities
 * NFT listing and trading
 */

export interface NFTListing {
  id: bigint;
  nft: Address;
  tokenId: bigint;
  seller: Address;
  price: bigint;
  active: boolean;
}

export function calculateMarketplaceFee(
  price: bigint,
  feeRate: number = 0.025
): bigint {
  return (price * BigInt(Math.floor(feeRate * 10000))) / BigInt(10000);
}
