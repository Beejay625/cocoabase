import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPollinationRecord,
  type PollinationRecord,
} from '@/lib/onchain-farm-crop-pollination-tracking-utils';

/**
 * Hook for onchain farm crop pollination tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropPollinationTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<PollinationRecord[]>([]);

  const recordPollination = async (
    plantationId: string,
    pollinatorType: string,
    pollinationDate: bigint,
    successRate: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createPollinationRecord(address, plantationId, pollinatorType, pollinationDate, successRate);
    setRecords([...records, record]);
  };

  const verifyPollination = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyPollination',
      args: [recordId],
    });
  };

  return { records, recordPollination, verifyPollination, address };
}

