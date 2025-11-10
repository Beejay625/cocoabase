import { type Address } from 'viem';

/**
 * Gas estimation utilities
 * Estimate gas costs for transactions
 */

export interface GasEstimate {
  gasLimit: bigint;
  gasPrice: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  totalCost: bigint;
}

export interface GasPriceData {
  slow: bigint;
  standard: bigint;
  fast: bigint;
}

/**
 * Estimate gas cost in ETH
 */
export function estimateGasCost(
  gasLimit: bigint,
  gasPrice: bigint
): bigint {
  return gasLimit * gasPrice;
}

/**
 * Format gas price in Gwei
 */
export function formatGasPrice(gasPrice: bigint): string {
  return `${Number(gasPrice) / 1e9} Gwei`;
}

/**
 * Calculate optimal gas price
 */
export function calculateOptimalGasPrice(
  prices: GasPriceData,
  priority: 'slow' | 'standard' | 'fast' = 'standard'
): bigint {
  return prices[priority];
}

