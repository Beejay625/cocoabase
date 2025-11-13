import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMaturityRecord,
  type CropMaturityRecord,
} from '@/lib/onchain-farm-crop-maturity-tracking-utils';

/**
 * Hook for onchain farm crop maturity tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropMaturityTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<CropMaturityRecord[]>([]);

  const recordMaturity = async (
    plantationId: string,
    maturityStage: string,
    maturityPercentage: number,
    expectedHarvestDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createMaturityRecord(address, plantationId, maturityStage, maturityPercentage, expectedHarvestDate);
    setRecords([...records, record]);
  };

  const updateMaturity = async (
    contractAddress: Address,
    recordId: string,
    newPercentage: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateMaturity',
      args: [recordId, newPercentage],
    });
  };

  return { records, recordMaturity, updateMaturity, address };
}

