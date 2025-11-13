import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeedRecord,
  type FeedRecord,
} from '@/lib/onchain-farm-livestock-feed-management-utils';

/**
 * Hook for onchain farm livestock feed management
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockFeedManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<FeedRecord[]>([]);

  const recordFeeding = async (
    animalId: string,
    feedType: string,
    amount: bigint,
    feedingDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createFeedRecord(address, animalId, feedType, amount, feedingDate);
    setRecords([...records, record]);
  };

  const verifyFeeding = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyFeeding',
      args: [recordId],
    });
  };

  return { records, recordFeeding, verifyFeeding, address };
}

