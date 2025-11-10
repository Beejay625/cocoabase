import { type Address } from 'viem';

/**
 * Onchain fractionalization utilities
 * NFT fractionalization for shared ownership
 */

export interface FractionalizedNFT {
  id: bigint;
  originalTokenId: bigint;
  originalContract: Address;
  fractionalToken: Address;
  totalShares: bigint;
  pricePerShare: bigint;
  owner: Address;
  status: 'active' | 'redeemed' | 'cancelled';
  createdAt: bigint;
}

export interface FractionalShare {
  owner: Address;
  shares: bigint;
  purchasePrice: bigint;
}

export function fractionalizeNFT(
  owner: Address,
  tokenId: bigint,
  contract: Address,
  totalShares: bigint,
  pricePerShare: bigint,
  fractionalToken: Address
): FractionalizedNFT {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    originalTokenId: tokenId,
    originalContract: contract,
    fractionalToken,
    totalShares,
    pricePerShare,
    owner,
    status: 'active',
    createdAt: now,
  };
}

export function purchaseShares(
  fractionalized: FractionalizedNFT,
  buyer: Address,
  shares: bigint
): { fractionalized: FractionalizedNFT; share: FractionalShare } | null {
  if (fractionalized.status !== 'active') return null;
  if (shares > fractionalized.totalShares) return null;

  const share: FractionalShare = {
    owner: buyer,
    shares,
    purchasePrice: fractionalized.pricePerShare * shares,
  };

  return {
    fractionalized: {
      ...fractionalized,
      totalShares: fractionalized.totalShares - shares,
    },
    share,
  };
}

export function redeemNFT(
  fractionalized: FractionalizedNFT,
  redeemer: Address,
  requiredShares: bigint
): FractionalizedNFT | null {
  if (fractionalized.status !== 'active') return null;
  if (requiredShares < fractionalized.totalShares / BigInt(2)) return null;

  return {
    ...fractionalized,
    status: 'redeemed',
  };
}

export function calculateOwnershipPercentage(
  shares: bigint,
  totalShares: bigint
): number {
  if (totalShares === BigInt(0)) return 0;
  return Number((shares * BigInt(10000)) / totalShares) / 100;
}

