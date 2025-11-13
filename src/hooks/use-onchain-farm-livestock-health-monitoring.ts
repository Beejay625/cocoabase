import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createHealthRecord,
  type LivestockHealthRecord,
} from '@/lib/onchain-farm-livestock-health-monitoring-utils';

/**
 * Hook for onchain farm livestock health monitoring
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockHealthMonitoring() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<LivestockHealthRecord[]>([]);

  const recordHealthCheck = async (
    animalId: string,
    healthStatus: string,
    temperature: number,
    weight: bigint,
    checkDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createHealthRecord(address, animalId, healthStatus, temperature, weight, checkDate);
    setRecords([...records, record]);
  };

  const updateHealthStatus = async (
    contractAddress: Address,
    recordId: string,
    newStatus: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateHealthStatus',
      args: [recordId, newStatus],
    });
  };

  return { records, recordHealthCheck, updateHealthStatus, address };
}

