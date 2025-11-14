import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createHealthRecord,
  type HealthRecord,
} from '@/lib/onchain-farm-livestock-health-records-utils';

/**
 * Hook for onchain farm livestock health records
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockHealthRecords() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<HealthRecord[]>([]);

  const recordHealth = async (
    animalId: string,
    healthStatus: string,
    veterinarian: string,
    examinationDate: bigint,
    notes: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createHealthRecord(address, animalId, healthStatus, veterinarian, examinationDate, notes);
    setRecords([...records, record]);
  };

  const updateHealthRecord = async (
    contractAddress: Address,
    recordId: string,
    newStatus: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateHealthRecord',
      args: [recordId, newStatus],
    });
  };

  return { records, recordHealth, updateHealthRecord, address };
}

