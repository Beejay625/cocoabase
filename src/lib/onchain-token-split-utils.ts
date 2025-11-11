import { type Address } from 'viem';

export interface TokenSplit {
  id: bigint;
  token: Address;
  splitRatio: number;
  newToken: Address;
  timestamp: bigint;
}

export function createTokenSplit(
  token: Address,
  splitRatio: number,
  newToken: Address
): TokenSplit {
  return {
    id: BigInt(0),
    token,
    splitRatio,
    newToken,
    timestamp: BigInt(Date.now()),
  };
}

