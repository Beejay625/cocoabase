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
