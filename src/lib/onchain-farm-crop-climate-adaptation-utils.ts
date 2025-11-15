import { type Address } from 'viem';

export interface AdaptationStrategy {
  id: string;
  plantationId: bigint;
  cropType: string;
  strategyType: string;
  effectivenessScore: bigint;
  owner: Address;
  active: boolean;
}

export function createAdaptationStrategy(
  address: Address,
  plantationId: bigint,
  cropType: string,
  strategyType: string,
  effectivenessScore: bigint
): AdaptationStrategy {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    strategyType,
    effectivenessScore,
    owner: address,
    active: true,
  };
}


