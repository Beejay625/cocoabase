import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPreventionPlan,
  type DiseasePreventionPlan,
} from '@/lib/onchain-farm-crop-disease-prevention-utils';

/**
 * Hook for onchain farm crop disease prevention
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropDiseasePrevention() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [plans, setPlans] = useState<DiseasePreventionPlan[]>([]);

  const createPlan = async (
    plantationId: string,
    preventionMethods: string[],
    schedule: string,
    startDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const plan = createPreventionPlan(address, plantationId, preventionMethods, schedule, startDate);
    setPlans([...plans, plan]);
  };

  const executePrevention = async (
    contractAddress: Address,
    planId: string,
    method: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'executePrevention',
      args: [planId, method],
    });
  };

  return { plans, createPlan, executePrevention, address };
}

