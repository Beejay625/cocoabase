import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createStakingRewards,
  stakeTokens,
  calculatePendingRewards,
  type StakingRewards,
  type StakerReward,
} from '@/lib/onchain-staking-rewards-utils';

export function useOnchainStakingRewards() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [rewards, setRewards] = useState<StakingRewards[]>([]);
  const [stakerRewards, setStakerRewards] = useState<StakerReward[]>([]);
  const [isStaking, setIsStaking] = useState(false);

  const stake = async (
    rewardsId: bigint,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsStaking(true);
    try {
      const reward = rewards.find((r) => r.id === rewardsId);
      if (!reward) throw new Error('Rewards contract not found');
      const { stakerReward } = stakeTokens(reward, address, amount);
      console.log('Staking tokens:', { rewardsId, amount });
    } finally {
      setIsStaking(false);
    }
  };

  return {
    rewards,
    stakerRewards,
    stake,
    calculatePendingRewards,
    isStaking,
    address,
  };
}
