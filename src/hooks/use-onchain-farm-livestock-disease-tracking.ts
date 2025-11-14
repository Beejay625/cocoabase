import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createDiseaseRecord,
  type DiseaseRecord,
} from '@/lib/onchain-farm-livestock-disease-tracking-utils';

/**
 * Hook for onchain farm livestock disease tracking
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockDiseaseTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<DiseaseRecord[]>([]);

  const recordDisease = async (
    animalId: string,
    diseaseName: string,
    diagnosisDate: bigint,
    veterinarian: string,
    treatment: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createDiseaseRecord(address, animalId, diseaseName, diagnosisDate, veterinarian, treatment);
    setRecords([...records, record]);
  };

  const updateTreatment = async (
    contractAddress: Address,
    recordId: string,
    newTreatment: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateTreatment',
      args: [recordId, newTreatment],
    });
  };

  return { records, recordDisease, updateTreatment, address };
}

