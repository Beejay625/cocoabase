import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createConservationPlan,
  type SoilConservationPlan,
} from '@/lib/onchain-farm-soil-conservation-utils';

/**
 * Hook for onchain farm soil conservation
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSoilConservation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [plans, setPlans] = useState<SoilConservationPlan[]>([]);

  const createPlan = async (
    plantationId: string,
    conservationMethods: string[],
    startDate: bigint,
    targetErosion: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const plan = createConservationPlan(address, plantationId, conservationMethods, startDate, targetErosion);
    setPlans([...plans, plan]);
  };

  const recordProgress = async (
    contractAddress: Address,
    planId: string,
    erosionReduction: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'recordProgress',
      args: [planId, erosionReduction],
    });
  };

  return { plans, createPlan, recordProgress, address };
}

