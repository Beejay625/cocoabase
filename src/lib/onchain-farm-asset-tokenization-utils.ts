import { type Address } from 'viem';

export interface TokenizedAsset {
  id: bigint;
  owner: Address;
  assetType: 'land' | 'equipment' | 'crop' | 'livestock';
  tokenAmount: bigint;
  tokenizedDate: bigint;
  status: 'active' | 'redeemed' | 'burned';
  txHash: string;
}

export function tokenizeAsset(
  owner: Address,
  assetType: TokenizedAsset['assetType'],
  tokenAmount: bigint
): TokenizedAsset {
  return {
    id: BigInt(Date.now()),
    owner,
    assetType,
    tokenAmount,
    tokenizedDate: BigInt(Date.now()),
    status: 'active',
    txHash: '',
  };
}

export function redeemTokens(
  asset: TokenizedAsset
): TokenizedAsset {
  return {
    ...asset,
    status: 'redeemed',
  };
}

export function getActiveTokenizedAssets(
  assets: TokenizedAsset[]
): TokenizedAsset[] {
  return assets.filter((a) => a.status === 'active');
}

export function getTotalTokenizedValue(
  assets: TokenizedAsset[]
): bigint {
  return assets
    .filter((a) => a.status === 'active')
    .reduce((total, a) => total + a.tokenAmount, BigInt(0));
}
