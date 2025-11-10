import { type Address } from 'viem';

export interface StakingRewards {
  id: bigint;
  stakingToken: Address;
  rewardToken: Address;
  rewardRate: bigint;
  totalStaked: bigint;
  periodFinish: bigint;
}

export function createStakingRewards(
  stakingToken: Address,
  rewardToken: Address,
  rewardRate: bigint,
  duration: bigint
): StakingRewards {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    stakingToken,
    rewardToken,
    rewardRate,
    totalStaked: BigInt(0),
    periodFinish: now + duration,
  };
}

