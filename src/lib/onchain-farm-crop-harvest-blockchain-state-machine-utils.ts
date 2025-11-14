import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain state machine utilities
 * State transition creation on blockchain
 */

export interface StateTransition {
  id: string;
  harvestId: string;
  transitionedBy: Address;
  fromState: string;
  toState: string;
  transitionDate: bigint;
  condition: string;
  verified: boolean;
  timestamp: bigint;
}

export function createStateTransition(
  address: Address,
  harvestId: string,
  fromState: string,
  toState: string,
  transitionDate: bigint,
  condition: string
): StateTransition {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    transitionedBy: address,
    fromState,
    toState,
    transitionDate,
    condition,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

