import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCropMonitoring,
  type CropMonitoring,
} from '@/lib/onchain-farm-crop-monitoring-utils';

/**
 * Hook for onchain farm crop monitoring
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropMonitoring() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [monitorings, setMonitorings] = useState<CropMonitoring[]>([]);

  const monitorCrop = async (
    plantationId: string,
    growthStage: string,
    healthScore: number,
    notes: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const monitoring = createCropMonitoring(address, plantationId, growthStage, healthScore, notes);
    setMonitorings([...monitorings, monitoring]);
  };

  const updateMonitoring = async (
    contractAddress: Address,
    monitoringId: string,
    newHealthScore: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateMonitoring',
      args: [monitoringId, newHealthScore],
    });
  };

  return { monitorings, monitorCrop, updateMonitoring, address };
}

