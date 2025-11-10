import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createMultisigTx,
  type MultisigTransaction,
} from '@/lib/onchain-multisig-utils';

export function useOnchainMultisig() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<MultisigTransaction[]>([]);

  const createTransaction = async (
    to: Address,
    value: bigint,
    threshold: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Creating multisig transaction:', { to, value, threshold });
  };

  return { transactions, createTransaction, address };
}

