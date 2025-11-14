import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLedgerEntry,
  type LedgerEntry,
} from '@/lib/onchain-farm-crop-harvest-blockchain-ledger-utils';

/**
 * Hook for onchain farm crop harvest blockchain ledger
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainLedger() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [entries, setEntries] = useState<LedgerEntry[]>([]);

  const createEntry = async (
    harvestId: string,
    transactionType: string,
    amount: bigint,
    fromAddress: Address,
    toAddress: Address,
    transactionDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const entry = createLedgerEntry(address, harvestId, transactionType, amount, fromAddress, toAddress, transactionDate);
    setEntries([...entries, entry]);
  };

  const verifyEntry = async (
    contractAddress: Address,
    entryId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyEntry',
      args: [entryId],
    });
  };

  return { entries, createEntry, verifyEntry, address };
}

