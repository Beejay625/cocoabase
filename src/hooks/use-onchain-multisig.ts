import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type MultiSigTransaction,
} from '@/lib/onchain-multisig-utils';

export function useOnchainMultisig() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [transactions, setTransactions] = useState<MultiSigTransaction[]>([]);

  const createTransaction = async (
    to: Address,
    value: bigint,
    threshold: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'createTransaction',
      args: [to, value, threshold],
    });
  };

  return { transactions, createTransaction, address };
}
