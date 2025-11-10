import { type Address } from 'viem';

/**
 * Onchain multi-signature utilities
 * Multi-sig wallet operations and approvals
 */

export interface MultiSigWallet {
  address: Address;
  owners: Address[];
  threshold: number;
  nonce: bigint;
}

export interface MultiSigTransaction {
  to: Address;
  value: bigint;
  data: string;
  approvals: Address[];
  executed: boolean;
}

/**
 * Check if transaction has enough approvals
 */
export function hasEnoughApprovals(
  tx: MultiSigTransaction,
  wallet: MultiSigWallet
): boolean {
  return tx.approvals.length >= wallet.threshold && !tx.executed;
}
