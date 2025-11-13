import { type Address } from 'viem';

export interface TokenMerge {
  id: bigint;
  tokenA: Address;
  tokenB: Address;
  mergedToken: Address;
  mergeRatio: number;
  timestamp: bigint;
}

export function createTokenMerge(
  tokenA: Address,
  tokenB: Address,
  mergedToken: Address,
  mergeRatio: number
): TokenMerge {
  return {
    id: BigInt(0),
    tokenA,
    tokenB,
    mergedToken,
    mergeRatio,
    timestamp: BigInt(Date.now()),
  };
}

export function calculateMergeAmount(
  merge: TokenMerge,
  amountA: bigint,
  amountB: bigint
): bigint {
  const merged = amountA + (amountB * BigInt(Math.floor(merge.mergeRatio * 100))) / BigInt(10000);
  return merged;
}
