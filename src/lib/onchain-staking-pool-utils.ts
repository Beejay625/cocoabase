import { type Address } from 'viem';

export interface StakingPool {
  id: bigint;
  token: Address;
  rewardToken: Address;
  totalStaked: bigint;
  rewardRate: bigint;
  lockPeriod: bigint;
  owner: Address;
}

export interface StakingPosition {
  staker: Address;
  amount: bigint;
  stakedAt: bigint;
  rewards: bigint;
}

export function createStakingPool(
  token: Address,
  rewardToken: Address,
  rewardRate: bigint,
  lockPeriod: bigint,
  owner: Address
): StakingPool {
  return {
    id: BigInt(0),
    token,
    rewardToken,
    totalStaked: BigInt(0),
    rewardRate,
    lockPeriod,
    owner,
  };
}

export function stake(
  pool: StakingPool,
  staker: Address,
  amount: bigint,
  currentTime: bigint
): { pool: StakingPool; position: StakingPosition } {
  return {
    pool: {
      ...pool,
      totalStaked: pool.totalStaked + amount,
    },
    position: {
      staker,
      amount,
      stakedAt: currentTime,
      rewards: BigInt(0),
    },
  };
}

export function calculateRewards(
  position: StakingPosition,
  pool: StakingPool,
  currentTime: bigint
): bigint {
  const stakedDuration = currentTime - position.stakedAt;
  return (position.amount * pool.rewardRate * stakedDuration) / BigInt(86400);
}
