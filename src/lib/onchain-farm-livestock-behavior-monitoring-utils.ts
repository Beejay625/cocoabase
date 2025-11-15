import { type Address } from 'viem';

export interface BehaviorObservation {
  id: string;
  livestockId: bigint;
  behaviorType: string;
  duration: bigint;
  frequency: bigint;
  observer: Address;
}

export function createBehaviorObservation(
  address: Address,
  livestockId: bigint,
  behaviorType: string,
  duration: bigint,
  frequency: bigint
): BehaviorObservation {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    behaviorType,
    duration,
    frequency,
    observer: address,
  };
}


