import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createPreventionPlan,
  type PreventionPlan,
} from '@/lib/onchain-crop-disease-prevention-system-utils';

export function useOnchainCropDiseasePreventionSystem() {
  const { address } = useAccount();
  const [plans, setPlans] = useState<PreventionPlan[]>([]);

  const create = async (
    plantationId: bigint,
    diseaseType: string,
    preventionMethod: string,
    scheduledDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const plan = createPreventionPlan(address, plantationId, diseaseType, preventionMethod, scheduledDate);
    setPlans([...plans, plan]);
  };

  return { plans, create, address };
}
