import { type Address } from 'viem';

export interface MultisigWallet {
  id: bigint;
  owners: Address[];
  threshold: number;
  nonce: bigint;
  transactions: MultisigTransaction[];
}

export interface MultisigTransaction {
  to: Address;
  value: bigint;
  data: string;
  signatures: Map<Address, string>;
  executed: boolean;
}

export function createMultisigWallet(
  owners: Address[],
  threshold: number
): MultisigWallet {
  return {
    id: BigInt(0),
    owners,
    threshold,
    nonce: BigInt(0),
    transactions: [],
  };
}

export function addTransaction(
  wallet: MultisigWallet,
  to: Address,
  value: bigint,
  data: string
): MultisigWallet {
  const transaction: MultisigTransaction = {
    to,
    value,
    data,
    signatures: new Map(),
    executed: false,
  };
  return {
    ...wallet,
    transactions: [...wallet.transactions, transaction],
    nonce: wallet.nonce + BigInt(1),
  };
}

export function signTransaction(
  wallet: MultisigWallet,
  txIndex: number,
  owner: Address,
  signature: string
): MultisigWallet | null {
  if (!wallet.owners.includes(owner)) return null;
  const transaction = wallet.transactions[txIndex];
  if (!transaction || transaction.executed) return null;
  const newSignatures = new Map(transaction.signatures);
  newSignatures.set(owner, signature);
  const newTransactions = [...wallet.transactions];
  newTransactions[txIndex] = { ...transaction, signatures: newSignatures };
  return { ...wallet, transactions: newTransactions };
}

export function canExecuteTransaction(
  wallet: MultisigWallet,
  txIndex: number
): boolean {
  const transaction = wallet.transactions[txIndex];
  if (!transaction || transaction.executed) return false;
  return transaction.signatures.size >= wallet.threshold;
}
