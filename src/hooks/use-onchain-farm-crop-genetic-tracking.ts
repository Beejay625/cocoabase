import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createGeneticRecord,
  type GeneticRecord,
} from '@/lib/onchain-farm-crop-genetic-tracking-utils';

/**
 * Hook for onchain farm crop genetic tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropGeneticTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<GeneticRecord[]>([]);

  const recordGenetics = async (
    cropVariety: string,
    geneticMarker: string,
    trait: string,
    recordDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createGeneticRecord(address, cropVariety, geneticMarker, trait, recordDate);
    setRecords([...records, record]);
  };

  const verifyGenetic = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyGenetic',
      args: [recordId],
    });
  };

  return { records, recordGenetics, verifyGenetic, address };
}

