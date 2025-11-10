import { type Address } from 'viem';

/**
 * Onchain yield farming utilities
 * Yield farming pools and rewards
 */

export interface YieldFarm {
  address: Address;
  stakingToken: Address;
  rewardToken: Address;
  rewardRate: bigint;
  totalStaked: bigint;
  periodFinish: bigint;
  apr: number;
}

export interface FarmPosition {
  user: Address;
  farm: Address;
  stakedAmount: bigint;
  rewardDebt: bigint;
  lastUpdate: bigint;
}

export function calculateFarmRewards(
  position: FarmPosition,
  farm: YieldFarm,
  currentTime: bigint
): bigint {
  if (currentTime > farm.periodFinish || position.stakedAmount === BigInt(0)) {
    return BigInt(0);
  }
  const timeElapsed = currentTime - position.lastUpdate;
  const reward = (position.stakedAmount * farm.rewardRate * timeElapsed) / BigInt(1000000);
  return reward - position.rewardDebt;
}

export function calculateFarmAPR(
  farm: YieldFarm,
  rewardPrice: bigint,
  stakingPrice: bigint
): number {
  if (farm.totalStaked === BigInt(0) || stakingPrice === BigInt(0)) {
    return 0;
  }
  const annualRewards = farm.rewardRate * BigInt(365 * 24 * 60 * 60);
  const rewardValue = (annualRewards * rewardPrice) / BigInt(10 ** 18);
  const stakingValue = (farm.totalStaked * stakingPrice) / BigInt(10 ** 18);
  return (Number(rewardValue) / Number(stakingValue)) * 100;
}

export function stakeInFarm(
  position: FarmPosition,
  amount: bigint
): FarmPosition {
  return {
    ...position,
    stakedAmount: position.stakedAmount + amount,
    lastUpdate: BigInt(Date.now()),
  };
}

export function unstakeFromFarm(
  position: FarmPosition,
  amount: bigint
): FarmPosition {
  return {
    ...position,
    stakedAmount: position.stakedAmount - amount,
    lastUpdate: BigInt(Date.now()),
  };
}

export function canHarvestRewards(
  position: FarmPosition,
  farm: YieldFarm,
  currentTime: bigint
): boolean {
  const rewards = calculateFarmRewards(position, farm, currentTime);
  return rewards > BigInt(0);
}

export function getFarmTVL(
  farm: YieldFarm,
  tokenPrice: bigint
): bigint {
  return (farm.totalStaked * tokenPrice) / BigInt(10 ** 18);
}
