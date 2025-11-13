import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMetrics,
  type SustainabilityMetrics,
} from '@/lib/onchain-farm-sustainability-metrics-utils';

/**
 * Hook for onchain farm sustainability metrics
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSustainabilityMetrics() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [metrics, setMetrics] = useState<SustainabilityMetrics[]>([]);

  const recordMetrics = async (
    plantationId: string,
    carbonFootprint: bigint,
    waterUsage: bigint,
    biodiversityScore: number,
    soilHealthScore: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const metric = createMetrics(address, plantationId, carbonFootprint, waterUsage, biodiversityScore, soilHealthScore);
    setMetrics([...metrics, metric]);
  };

  const calculateScore = async (
    contractAddress: Address,
    metricId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'calculateScore',
      args: [metricId],
    });
  };

  return { metrics, recordMetrics, calculateScore, address };
}

