import { type Address } from 'viem';

export interface RewardDistribution {
  id: bigint;
  token: Address;
  totalRewards: bigint;
  distributed: bigint;
  recipients: Map<Address, bigint>;
}

export function createRewardDistribution(
  token: Address,
  totalRewards: bigint
): RewardDistribution {
  return {
    id: BigInt(0),
    token,
    totalRewards,
    distributed: BigInt(0),
    recipients: new Map(),
  };
}

