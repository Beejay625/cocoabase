import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSustainabilityMetrics,
  type SustainabilityMetrics,
} from '@/lib/onchain-farm-crop-harvest-sustainability-metrics-utils';

/**
 * Hook for onchain farm crop harvest sustainability metrics
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestSustainabilityMetrics() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [metrics, setMetrics] = useState<SustainabilityMetrics[]>([]);

  const recordMetrics = async (
    harvestId: string,
    waterUsage: bigint,
    carbonFootprint: bigint,
    biodiversityScore: number,
    recordDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const metric = createSustainabilityMetrics(address, harvestId, waterUsage, carbonFootprint, biodiversityScore, recordDate);
    setMetrics([...metrics, metric]);
  };

  const updateMetrics = async (
    contractAddress: Address,
    metricId: string,
    newCarbonFootprint: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateMetrics',
      args: [metricId, newCarbonFootprint],
    });
  };

  return { metrics, recordMetrics, updateMetrics, address };
}

