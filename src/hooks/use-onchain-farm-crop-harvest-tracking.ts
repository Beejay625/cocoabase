import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createHarvestRecord,
  type HarvestRecord,
} from '@/lib/onchain-farm-crop-harvest-tracking-utils';

/**
 * Hook for onchain farm crop harvest tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropHarvestTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<HarvestRecord[]>([]);

  const recordHarvest = async (
    plantationId: string,
    cropType: string,
    yieldAmount: bigint,
    harvestDate: bigint,
    quality: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createHarvestRecord(address, plantationId, cropType, yieldAmount, harvestDate, quality);
    setRecords([...records, record]);
  };

  const verifyHarvest = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyHarvest',
      args: [recordId],
    });
  };

  return { records, recordHarvest, verifyHarvest, address };
}

