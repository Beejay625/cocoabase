import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createDiseaseRecord,
  type DiseaseRecord,
} from '@/lib/onchain-farm-crop-disease-tracking-utils';

/**
 * Hook for onchain farm crop disease tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropDiseaseTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<DiseaseRecord[]>([]);

  const recordDisease = async (
    plantationId: string,
    diseaseType: string,
    severity: number,
    affectedArea: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createDiseaseRecord(address, plantationId, diseaseType, severity, affectedArea);
    setRecords([...records, record]);
  };

  const recordTreatment = async (
    contractAddress: Address,
    recordId: string,
    treatment: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'recordTreatment',
      args: [recordId, treatment],
    });
  };

  return { records, recordDisease, recordTreatment, address };
}

