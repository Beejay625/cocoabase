import { type Address, type Hash } from 'viem';

/**
 * Onchain verification utilities
 * Verify transactions, ownership, and data integrity
 */

export interface VerificationResult {
  verified: boolean;
  blockNumber?: bigint;
  timestamp?: number;
  txHash?: Hash;
}

/**
 * Verify wallet address format
 */
export function verifyAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Verify transaction hash format
 */
export function verifyTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

