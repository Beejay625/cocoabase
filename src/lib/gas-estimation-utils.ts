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

