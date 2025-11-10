import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createHealthRecord,
  updateHealthStatus,
  isCheckupDue,
  calculateHealthScore,
  type LivestockHealthRecord,
} from '@/lib/onchain-livestock-health-records-utils';

/**
 * Hook for onchain livestock health records operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainLivestockHealthRecords() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<LivestockHealthRecord[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const recordHealth = async (
    animalId: string,
    animalType: string,
    healthStatus: LivestockHealthRecord['healthStatus'],
    symptoms: string[],
    treatment: string,
    veterinarian: string,
    nextCheckup: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsRecording(true);
    try {
      const record = createHealthRecord(
        address,
        animalId,
        animalType,
        healthStatus,
        symptoms,
        treatment,
        veterinarian,
        nextCheckup
      );
      setRecords((prev) => [...prev, record]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'recordLivestockHealth',
        args: [animalId, animalType, healthStatus, symptoms, treatment, veterinarian, nextCheckup],
      });
    } finally {
      setIsRecording(false);
    }
  };

  return {
    records,
    recordHealth,
    updateHealthStatus,
    isCheckupDue,
    calculateHealthScore,
    isRecording,
    address,
  };
}

