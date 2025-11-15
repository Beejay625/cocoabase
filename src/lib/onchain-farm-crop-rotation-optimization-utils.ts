import { type Address } from 'viem';

export interface RotationPlan {
  id: string;
  planId: bigint;
  plantationId: bigint;
  cropSequence: string[];
  rotationPeriods: bigint[];
  planner: Address;
  startDate: bigint;
  active: boolean;
}

export function createRotationPlan(
  address: Address,
  plantationId: bigint,
  cropSequence: string[],
  rotationPeriods: bigint[]
): RotationPlan {
  return {
    id: `${Date.now()}-${Math.random()}`,
    planId: BigInt(0),
    plantationId,
    cropSequence,
    rotationPeriods,
    planner: address,
    startDate: BigInt(Date.now()),
    active: false,
  };
}



