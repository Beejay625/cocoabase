import { type Address } from 'viem';

/**
 * Onchain fractional ownership utilities
 * Fractional NFT ownership and shares
 */

export interface FractionalNFT {
  id: bigint;
  originalNFT: Address;
  tokenId: bigint;
  totalShares: bigint;
  sharePrice: bigint;
  owners: Map<Address, bigint>;
  active: boolean;
}

export interface FractionalShare {
  nftId: bigint;
  owner: Address;
  shares: bigint;
  percentage: number;
}

export function createFractionalNFT(
  originalNFT: Address,
  tokenId: bigint,
  totalShares: bigint,
  sharePrice: bigint
): FractionalNFT {
  return {
    id: BigInt(0),
    originalNFT,
    tokenId,
    totalShares,
    sharePrice,
    owners: new Map(),
    active: true,
  };
}

export function purchaseShares(
  fractional: FractionalNFT,
  buyer: Address,
  shares: bigint
): FractionalNFT {
  const currentShares = fractional.owners.get(buyer) || BigInt(0);
  const newOwners = new Map(fractional.owners);
  newOwners.set(buyer, currentShares + shares);
  return {
    ...fractional,
    owners: newOwners,
  };
}

export function calculateOwnershipPercentage(
  fractional: FractionalNFT,
  owner: Address
): number {
  const shares = fractional.owners.get(owner) || BigInt(0);
  if (fractional.totalShares === BigInt(0)) return 0;
  return (Number(shares) / Number(fractional.totalShares)) * 100;
}

export function canRedeemNFT(
  fractional: FractionalNFT,
  requester: Address,
  threshold: number = 51
): boolean {
  const percentage = calculateOwnershipPercentage(fractional, requester);
  return percentage >= threshold;
}

export function calculateShareValue(
  fractional: FractionalNFT,
  shares: bigint
): bigint {
  return fractional.sharePrice * shares;
}

export function transferShares(
  fractional: FractionalNFT,
  from: Address,
  to: Address,
  shares: bigint
): FractionalNFT {
  const fromShares = fractional.owners.get(from) || BigInt(0);
  if (fromShares < shares) {
    throw new Error('Insufficient shares');
  }
  const toShares = fractional.owners.get(to) || BigInt(0);
  const newOwners = new Map(fractional.owners);
  newOwners.set(from, fromShares - shares);
  newOwners.set(to, toShares + shares);
  return {
    ...fractional,
    owners: newOwners,
  };
}

export function getTotalOwnership(
  fractional: FractionalNFT
): number {
  let total = BigInt(0);
  fractional.owners.forEach(shares => {
    total += shares;
  });
  if (fractional.totalShares === BigInt(0)) return 0;
  return (Number(total) / Number(fractional.totalShares)) * 100;
}

export function getFractionalPrice(
  fractional: FractionalNFT,
  nftValue: bigint
): bigint {
  if (fractional.totalShares === BigInt(0)) return BigInt(0);
  return (nftValue * fractional.sharePrice) / fractional.totalShares;
}
