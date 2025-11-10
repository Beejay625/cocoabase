import { type Address } from 'viem';

export interface AMPool {
  id: bigint;
  tokenA: Address;
  tokenB: Address;
  reserveA: bigint;
  reserveB: bigint;
  totalSupply: bigint;
  fee: number;
}

export function createAMMPool(
  tokenA: Address,
  tokenB: Address,
  reserveA: bigint,
  reserveB: bigint,
  fee: number
): AMPool {
  return {
    id: BigInt(0),
    tokenA,
    tokenB,
    reserveA,
    reserveB,
    totalSupply: BigInt(0),
    fee,
  };
}

