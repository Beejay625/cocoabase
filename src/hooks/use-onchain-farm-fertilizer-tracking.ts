import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFertilizerRecord,
  type FertilizerRecord,
} from '@/lib/onchain-farm-fertilizer-tracking-utils';

/**
 * Hook for onchain farm fertilizer tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmFertilizerTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<FertilizerRecord[]>([]);

  const recordApplication = async (
    plantationId: string,
    fertilizerType: string,
    amount: bigint,
    applicationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createFertilizerRecord(address, plantationId, fertilizerType, amount, applicationDate);
    setRecords([...records, record]);
  };

  const verifyApplication = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyApplication',
      args: [recordId],
    });
  };

  return { records, recordApplication, verifyApplication, address };
}

