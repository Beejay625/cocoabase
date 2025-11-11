import { type Address } from 'viem';

/**
 * Onchain voting power utilities
 * Voting power delegation system
 */

export interface VotingPower {
  address: Address;
  power: bigint;
  snapshot: bigint;
  delegatedTo: Address | null;
}

export function createVotingPower(
  address: Address,
  power: bigint,
  snapshot: bigint
): VotingPower {
  return {
    address,
    power,
    snapshot,
    delegatedTo: null,
  };
}
