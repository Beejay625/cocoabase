import { type Address } from 'viem';

/**
 * Onchain bridge utilities
 * Cross-chain asset bridging
 */

export interface Bridge {
  address: Address;
  sourceChain: number;
  targetChain: number;
  token: Address;
  fee: bigint;
}

export interface BridgeTransaction {
  id: bigint;
  user: Address;
  amount: bigint;
  sourceChain: number;
  targetChain: number;
  status: 'pending' | 'completed' | 'failed';
}

export function calculateBridgeFee(
  amount: bigint,
  feeRate: number = 0.001
): bigint {
  return (amount * BigInt(Math.floor(feeRate * 1000000))) / BigInt(1000000);
}

export function estimateBridgeTime(
  sourceChain: number,
  targetChain: number
): number {
  return 15 * 60 * 1000; // 15 minutes default
}
