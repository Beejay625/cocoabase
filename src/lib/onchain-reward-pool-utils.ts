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

export function addParticipant(
  pool: RewardPool,
  participant: Address
): RewardPool {
  const newParticipants = new Set(pool.participants);
  newParticipants.add(participant);
  return {
    ...pool,
    participants: newParticipants,
  };
}

export function distributeRewards(
  pool: RewardPool,
  recipient: Address,
  amount: bigint,
  currentTime: bigint
): RewardPool | null {
  if (currentTime < pool.startTime || currentTime > pool.endTime) return null;
  if (pool.distributed + amount > pool.totalRewards) return null;
  if (!pool.participants.has(recipient)) return null;
  return {
    ...pool,
    distributed: pool.distributed + amount,
  };
}

export function calculateRemainingRewards(pool: RewardPool): bigint {
  return pool.totalRewards - pool.distributed;
}
