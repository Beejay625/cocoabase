import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createStakingRewards,
  stakeTokens,
  calculateRewards,
  type StakingRewards,
  type StakingPosition,
} from '@/lib/onchain-staking-rewards-utils';

export function useOnchainStakingRewards() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [rewards, setRewards] = useState<StakingRewards[]>([]);
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [isStaking, setIsStaking] = useState(false);

  const stake = async (
    rewardsId: bigint,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsStaking(true);
    try {
      const currentTime = BigInt(Date.now());
      const reward = rewards.find((r) => r.id === rewardsId);
      if (!reward) throw new Error('Rewards pool not found');
      const result = stakeTokens(reward, address, amount, currentTime);
      console.log('Staking tokens:', result);
    } finally {
      setIsStaking(false);
    }
  };

  return {
    rewards,
    positions,
    stake,
    calculateRewards,
    isStaking,
    address,
  };
}

