import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPerformanceRecord,
  type PerformanceRecord,
} from '@/lib/onchain-farm-livestock-performance-tracking-utils';

/**
 * Hook for onchain farm livestock performance tracking
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockPerformanceTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<PerformanceRecord[]>([]);

  const recordPerformance = async (
    animalId: string,
    performanceMetric: string,
    value: bigint,
    measurementDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createPerformanceRecord(address, animalId, performanceMetric, value, measurementDate);
    setRecords([...records, record]);
  };

  const updatePerformance = async (
    contractAddress: Address,
    recordId: string,
    newValue: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updatePerformance',
      args: [recordId, newValue],
    });
  };

  return { records, recordPerformance, updatePerformance, address };
}

