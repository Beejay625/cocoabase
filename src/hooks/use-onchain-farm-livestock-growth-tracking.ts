import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createGrowthRecord,
  type GrowthRecord,
} from '@/lib/onchain-farm-livestock-growth-tracking-utils';

/**
 * Hook for onchain farm livestock growth tracking
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockGrowthTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<GrowthRecord[]>([]);

  const recordGrowth = async (
    animalId: string,
    weight: bigint,
    height: bigint,
    measurementDate: bigint,
    measurementMethod: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createGrowthRecord(address, animalId, weight, height, measurementDate, measurementMethod);
    setRecords([...records, record]);
  };

  const updateGrowth = async (
    contractAddress: Address,
    recordId: string,
    newWeight: bigint,
    newHeight: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateGrowth',
      args: [recordId, newWeight, newHeight],
    });
  };

  return { records, recordGrowth, updateGrowth, address };
}

