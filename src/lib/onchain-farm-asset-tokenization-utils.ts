import { type Address } from 'viem';

export interface TokenizedAsset {
  id: bigint;
  asset: Address;
  token: Address;
  totalSupply: bigint;
  value: bigint;
}

export function createTokenizedAsset(
  asset: Address,
  token: Address,
  totalSupply: bigint,
  value: bigint
): TokenizedAsset {
  return {
    id: BigInt(0),
    asset,
    token,
    totalSupply,
    value,
  };
}

export function calculateTokenValue(
  asset: TokenizedAsset,
  tokenAmount: bigint
): bigint {
  if (asset.totalSupply === BigInt(0)) return BigInt(0);
  return (asset.value * tokenAmount) / asset.totalSupply;
}

export function redeemTokens(
  asset: TokenizedAsset,
  tokenAmount: bigint
): { asset: TokenizedAsset; redeemedValue: bigint } | null {
  if (tokenAmount > asset.totalSupply) return null;
  const redeemedValue = calculateTokenValue(asset, tokenAmount);
  return {
    asset: {
      ...asset,
      totalSupply: asset.totalSupply - tokenAmount,
      value: asset.value - redeemedValue,
    },
    redeemedValue,
  };
}
