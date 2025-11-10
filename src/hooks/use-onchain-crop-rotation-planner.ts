import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCropRotationPlan,
  activateRotationPlan,
  completeRotationPlan,
  calculateRotationBenefits,
  type CropRotationPlan,
} from '@/lib/onchain-crop-rotation-planner-utils';

/**
 * Hook for onchain crop rotation planner operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainCropRotationPlanner() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [plans, setPlans] = useState<CropRotationPlan[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createPlan = async (
    fieldId: string,
    currentCrop: string,
    previousCrops: string[],
    nextCrop: string,
    rotationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const plan = createCropRotationPlan(
        address,
        fieldId,
        currentCrop,
        previousCrops,
        nextCrop,
        rotationDate
      );
      setPlans((prev) => [...prev, plan]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createCropRotationPlan',
        args: [fieldId, currentCrop, previousCrops, nextCrop, rotationDate],
      });
    } finally {
      setIsCreating(false);
    }
  };

  return {
    plans,
    createPlan,
    activateRotationPlan,
    completeRotationPlan,
    calculateRotationBenefits,
    isCreating,
    address,
  };
}

