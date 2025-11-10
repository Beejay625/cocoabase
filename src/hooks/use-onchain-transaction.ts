import { useState } from 'react';
import { type Hash } from 'viem';
import {
  formatTxHash,
  isTransactionConfirmed,
  type TransactionStatus,
} from '@/lib/onchain-transaction-utils';

/**
 * Hook for tracking onchain transactions
 */
export function useOnchainTransaction() {
  const [transactions, setTransactions] = useState<Map<Hash, TransactionStatus>>(
    new Map()
  );

  const addTransaction = (hash: Hash) => {
    setTransactions((prev) => {
      const updated = new Map(prev);
      updated.set(hash, {
        hash,
        status: 'pending',
        confirmations: 0,
      });
      return updated;
    });
  };

  const updateTransaction = (hash: Hash, status: TransactionStatus) => {
    setTransactions((prev) => {
      const updated = new Map(prev);
      updated.set(hash, status);
      return updated;
    });
  };

  return {
    transactions: Array.from(transactions.values()),
    addTransaction,
    updateTransaction,
    formatTxHash,
    isTransactionConfirmed,
  };
}

