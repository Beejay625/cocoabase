import { type Address } from 'viem';

/**
 * Onchain liquidity pool utilities
 * LP token management and pool operations
 */

export interface LiquidityPool {
  address: Address;
  tokenA: Address;
  tokenB: Address;
  reserveA: bigint;
  reserveB: bigint;
  totalSupply: bigint;
  fee: number;
}

export interface LPToken {
  pool: Address;
  amount: bigint;
  shares: bigint;
}

export function calculateLPAmount(
  amountA: bigint,
  amountB: bigint,
  reserveA: bigint,
  reserveB: bigint,
  totalSupply: bigint
): bigint {
  if (totalSupply === BigInt(0)) {
    return amountA + amountB;
  }
  const liquidityA = (amountA * totalSupply) / reserveA;
  const liquidityB = (amountB * totalSupply) / reserveB;
  return liquidityA < liquidityB ? liquidityA : liquidityB;
}

export function calculateSwapOutput(
  amountIn: bigint,
  reserveIn: bigint,
  reserveOut: bigint,
  fee: number = 0.003
): bigint {
  const amountInWithFee = amountIn * BigInt(Math.floor((1 - fee) * 1000));
  const numerator = amountInWithFee * reserveOut;
  const denominator = (reserveIn * BigInt(1000)) + amountInWithFee;
  return numerator / denominator;
}

export function getPoolPrice(
  reserveA: bigint,
  reserveB: bigint
): number {
  if (reserveB === BigInt(0)) return 0;
  return Number(reserveA) / Number(reserveB);
}

export function calculateRemoveLiquidity(
  lpAmount: bigint,
  totalSupply: bigint,
  reserveA: bigint,
  reserveB: bigint
): { amountA: bigint; amountB: bigint } {
  const amountA = (lpAmount * reserveA) / totalSupply;
  const amountB = (lpAmount * reserveB) / totalSupply;
  return { amountA, amountB };
}

export function calculatePoolAPY(
  volume24h: bigint,
  liquidity: bigint,
  fee: number
): number {
  if (liquidity === BigInt(0)) return 0;
  const feeEarnings = (Number(volume24h) * fee * 365) / Number(liquidity);
  return feeEarnings * 100;
}

export function getLiquidityShare(
  lpAmount: bigint,
  totalSupply: bigint
): number {
  if (totalSupply === BigInt(0)) return 0;
  return (Number(lpAmount) / Number(totalSupply)) * 100;
}
