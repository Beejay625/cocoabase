import { type Address } from 'viem';

/**
 * Onchain tokenization utilities
 * Real-world asset tokenization
 */

export interface TokenizedAsset {
  id: bigint;
  assetType: string;
  totalSupply: bigint;
  pricePerToken: bigint;
  owner: Address;
}

export function calculateTokenValue(
  tokens: bigint,
  pricePerToken: bigint
): bigint {
  return tokens * pricePerToken;
}

export function calculateOwnershipPercentage(
  tokens: bigint,
  totalSupply: bigint
): number {
  if (totalSupply === BigInt(0)) return 0;
  return (Number(tokens) / Number(totalSupply)) * 100;
}
