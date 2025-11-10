import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  checkMilestone,
  type Milestone,
} from '@/lib/onchain-milestone-utils';

export function useOnchainMilestone() {
  const { address } = useAccount();
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const checkMilestones = async (
    currentValue: bigint
  ): Promise<Milestone[]> => {
    if (!address) throw new Error('Wallet not connected');
    return milestones.map(m => checkMilestone(m, currentValue, address));
  };

  return { milestones, checkMilestones, address };
}

