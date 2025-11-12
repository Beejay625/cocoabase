import { type Address } from 'viem';

export interface TokenizedAsset {
  id: bigint;
  owner: Address;
  assetType: string;
  tokenAmount: bigint;
  active: boolean;
}

export function createTokenizedAsset(
  owner: Address,
  assetType: string,
  tokenAmount: bigint
): TokenizedAsset {
  return {
    id: BigInt(0),
    owner,
    assetType,
    tokenAmount,
    active: true,
  };
}

export function redeemTokens(
  asset: TokenizedAsset,
  amount: bigint
): TokenizedAsset | null {
  if (!asset.active || amount > asset.tokenAmount) return null;
  return {
    ...asset,
    tokenAmount: asset.tokenAmount - amount,
    active: asset.tokenAmount - amount > BigInt(0),
  };
}

export function calculateTotalValue(assets: TokenizedAsset[]): bigint {
  return assets
    .filter((a) => a.active)
    .reduce((total, a) => total + a.tokenAmount, BigInt(0));
}
