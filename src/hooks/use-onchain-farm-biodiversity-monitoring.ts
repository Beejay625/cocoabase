import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBiodiversityRecord,
  type BiodiversityRecord,
} from '@/lib/onchain-farm-biodiversity-monitoring-utils';

/**
 * Hook for onchain farm biodiversity monitoring
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmBiodiversityMonitoring() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<BiodiversityRecord[]>([]);

  const recordBiodiversity = async (
    plantationId: string,
    speciesType: string,
    speciesCount: number,
    habitatArea: bigint,
    observationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createBiodiversityRecord(address, plantationId, speciesType, speciesCount, habitatArea, observationDate);
    setRecords([...records, record]);
  };

  const verifyRecord = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyRecord',
      args: [recordId],
    });
  };

  return { records, recordBiodiversity, verifyRecord, address };
}

