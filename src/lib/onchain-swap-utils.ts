import { type Address } from 'viem';

/**
 * Onchain swap utilities
 * Token swapping and DEX integration
 */

export interface Swap {
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  amountOut: bigint;
  slippage: number;
}

export function calculateSwapOutput(
  amountIn: bigint,
  reserveIn: bigint,
  reserveOut: bigint
): bigint {
  if (reserveIn === BigInt(0) || reserveOut === BigInt(0)) return BigInt(0);
  return (amountIn * reserveOut) / reserveIn;
}

export function calculatePriceImpact(
  amountIn: bigint,
  reserveIn: bigint
): number {
  if (reserveIn === BigInt(0)) return 0;
  return (Number(amountIn) / Number(reserveIn)) * 100;
}
