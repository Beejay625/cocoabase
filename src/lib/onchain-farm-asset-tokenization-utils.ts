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
