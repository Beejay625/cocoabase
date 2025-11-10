import { type Address } from 'viem';

export interface StakingRewards {
  id: bigint;
  stakingToken: Address;
  rewardToken: Address;
  rewardRate: bigint;
  totalStaked: bigint;
  lastUpdateTime: bigint;
}

export function createStakingRewards(
  stakingToken: Address,
  rewardToken: Address,
  rewardRate: bigint
): StakingRewards {
  return {
    id: BigInt(0),
    stakingToken,
    rewardToken,
    rewardRate,
    totalStaked: BigInt(0),
    lastUpdateTime: BigInt(Date.now()),
  };
}
