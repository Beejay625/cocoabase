import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createResistanceRecord,
  type DiseaseResistanceRecord,
} from '@/lib/onchain-farm-crop-disease-resistance-utils';

/**
 * Hook for onchain farm crop disease resistance tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropDiseaseResistance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<DiseaseResistanceRecord[]>([]);

  const recordResistance = async (
    cropVariety: string,
    diseaseType: string,
    resistanceLevel: number,
    testDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createResistanceRecord(address, cropVariety, diseaseType, resistanceLevel, testDate);
    setRecords([...records, record]);
  };

  const verifyResistance = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyResistance',
      args: [recordId],
    });
  };

  return { records, recordResistance, verifyResistance, address };
}

