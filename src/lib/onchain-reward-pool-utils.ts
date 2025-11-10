import { type Address } from 'viem';

export interface RewardPool {
  id: bigint;
  rewardToken: Address;
  totalRewards: bigint;
  distributed: bigint;
  startTime: bigint;
  endTime: bigint;
  participants: Set<Address>;
}

export function createRewardPool(
  rewardToken: Address,
  totalRewards: bigint,
  startTime: bigint,
  endTime: bigint
): RewardPool {
  return {
    id: BigInt(0),
    rewardToken,
    totalRewards,
    distributed: BigInt(0),
    startTime,
    endTime,
    participants: new Set(),
  };
}
