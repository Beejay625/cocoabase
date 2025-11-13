import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createSuccessionPlan,
  type SuccessionPlan,
} from '@/lib/onchain-farm-succession-planning-utils';

export function useOnchainFarmSuccessionPlanning() {
  const { address } = useAccount();
  const [plans, setPlans] = useState<SuccessionPlan[]>([]);

  const create = async (
    successor: Address,
    planType: string,
    effectiveDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const plan = createSuccessionPlan(address, successor, planType, effectiveDate);
    setPlans([...plans, plan]);
  };

  return { plans, create, address };
}
