import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createRotationPlan,
  type CropRotationPlan,
} from '@/lib/onchain-crop-rotation-planning-utils';

export function useOnchainCropRotationPlanning() {
  const { address } = useAccount();
  const [plans, setPlans] = useState<CropRotationPlan[]>([]);

  const createPlan = async (
    plantationId: bigint,
    currentCrop: string,
    nextCrop: string,
    rotationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const plan = createRotationPlan(address, plantationId, currentCrop, nextCrop, rotationDate);
    setPlans([...plans, plan]);
  };

  return { plans, createPlan, address };
}
