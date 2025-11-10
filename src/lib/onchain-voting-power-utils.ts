import { type Address } from 'viem';

export interface VotingPower {
  address: Address;
  power: bigint;
  delegatedFrom: Address[];
  delegatedTo: Address | null;
  snapshot: bigint;
}

export function createVotingPower(
  address: Address,
  power: bigint,
  snapshot: bigint
): VotingPower {
  return {
    address,
    power,
    delegatedFrom: [],
    delegatedTo: null,
    snapshot,
  };
}

