import { type Address } from 'viem';

export interface SustainabilityAction {
  id: string;
  actionId: bigint;
  plantationId: bigint;
  farmer: Address;
  actionType: string;
  pointsEarned: bigint;
  rewardAmount: bigint;
  actionDate: bigint;
  verified: boolean;
}

export function createSustainabilityAction(
  address: Address,
  plantationId: bigint,
  actionType: string,
  points: bigint
): SustainabilityAction {
  const pointsPerReward = BigInt(100);
  const rewardAmount = points * pointsPerReward;
  return {
    id: `${Date.now()}-${Math.random()}`,
    actionId: BigInt(0),
    plantationId,
    farmer: address,
    actionType,
    pointsEarned: points,
    rewardAmount,
    actionDate: BigInt(Date.now()),
    verified: false,
  };
}
