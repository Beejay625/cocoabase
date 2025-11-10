import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createRewardDistribution,
  distributeReward,
  calculateRemainingRewards,
  getRecipientReward,
  type RewardDistribution,
} from '@/lib/onchain-reward-distribution-utils';

export function useOnchainRewardDistribution() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [distributions, setDistributions] = useState<RewardDistribution[]>([]);
  const [isDistributing, setIsDistributing] = useState(false);

  const distribute = async (
    distributionId: bigint,
    recipient: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsDistributing(true);
    try {
      const distribution = distributions.find((d) => d.id === distributionId);
      if (!distribution) throw new Error('Distribution not found');
      const updated = distributeReward(distribution, recipient, amount);
      if (updated) {
        console.log('Distributing reward:', { distributionId, recipient, amount });
      }
    } finally {
      setIsDistributing(false);
    }
  };

  return {
    distributions,
    distribute,
    calculateRemainingRewards,
    getRecipientReward,
    isDistributing,
    address,
  };
}

