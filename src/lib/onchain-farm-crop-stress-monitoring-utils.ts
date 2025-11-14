import { type Address } from 'viem';

export interface StressReading {
  id: string;
  plantationId: bigint;
  stressType: string;
  stressLevel: bigint;
  recorder: Address;
}

export function createStressReading(
  address: Address,
  plantationId: bigint,
  stressType: string,
  stressLevel: bigint
): StressReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    stressType,
    stressLevel,
    recorder: address,
  };
}

