import { type Address } from 'viem';

/**
 * Cross-chain bridge utilities
 * Bridge assets between different chains
 */

export interface BridgeRoute {
  fromChain: number;
  toChain: number;
  tokenAddress: Address;
  bridgeAddress: Address;
  fee: bigint;
  estimatedTime: number;
}

export interface BridgeTransaction {
  id: string;
  fromChain: number;
  toChain: number;
  tokenAddress: Address;
  amount: bigint;
  recipient: Address;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

/**
 * Calculate bridge fee
 */
export function calculateBridgeFee(
  amount: bigint,
  feePercent: number = 0.1
): bigint {
  return (amount * BigInt(Math.floor(feePercent * 100))) / BigInt(1000);
}

/**
 * Estimate bridge time
 */
export function estimateBridgeTime(
  fromChain: number,
  toChain: number
): number {
  // Simplified estimation - in production use actual bridge APIs
  if (fromChain === toChain) return 0;
  return 15 * 60 * 1000; // 15 minutes default
}

/**
 * Check if bridge route exists
 */
export function hasBridgeRoute(
  fromChain: number,
  toChain: number
): boolean {
  return fromChain !== toChain;
}

