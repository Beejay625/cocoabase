import { useState } from 'react';
import { type Address } from 'viem';
import {
  calculateStakingReward,
  canUnstake,
  calculateStakingAPY,
  type StakingPosition,
} from '@/lib/staking-utils';

/**
 * Hook for staking operations
 */
export function useStaking(address?: Address) {
  const [positions, setPositions] = useState<StakingPosition[]>([]);

  const calculateReward = (
    amount: bigint,
    rewardRate: number,
    duration: number
  ) => {
    return calculateStakingReward(amount, rewardRate, duration);
  };

  const checkUnstakeable = (position: StakingPosition) => {
    return canUnstake(position);
  };

  const getAPY = (rewardRate: number) => {
    return calculateStakingAPY(rewardRate);
  };

  return {
    positions,
    calculateReward,
    checkUnstakeable,
    getAPY,
  };
}



