import { type Address } from 'viem';

/**
 * Onchain multi-signature wallet utilities
 * Multi-sig wallet operations and approvals
 */

export interface MultisigWallet {
  address: Address;
  owners: Address[];
  threshold: number;
  nonce: bigint;
}

export interface MultisigTransaction {
  id: bigint;
  to: Address;
  value: bigint;
  data: string;
  executed: boolean;
  confirmations: Address[];
  threshold: number;
}

export function createMultisigTx(
  to: Address,
  value: bigint,
  data: string,
  threshold: number
): MultisigTransaction {
  return {
    id: BigInt(0),
    to,
    value,
    data,
    executed: false,
    confirmations: [],
    threshold,
  };
}

export function addConfirmation(
  tx: MultisigTransaction,
  owner: Address
): MultisigTransaction {
  if (tx.confirmations.includes(owner) || tx.executed) {
    return tx;
  }
  return {
    ...tx,
    confirmations: [...tx.confirmations, owner],
  };
}

export function canExecuteTx(
  tx: MultisigTransaction
): boolean {
  return (
    !tx.executed &&
    tx.confirmations.length >= tx.threshold
  );
}

export function validateMultisigWallet(
  wallet: MultisigWallet
): boolean {
  return (
    wallet.owners.length > 0 &&
    wallet.threshold > 0 &&
    wallet.threshold <= wallet.owners.length
  );
}

export function isMultisigOwner(
  wallet: MultisigWallet,
  address: Address
): boolean {
  return wallet.owners.includes(address);
}

export function getRequiredConfirmations(
  tx: MultisigTransaction
): number {
  return Math.max(0, tx.threshold - tx.confirmations.length);
}
