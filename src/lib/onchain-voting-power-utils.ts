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

export function delegateVotingPower(
  from: VotingPower,
  to: Address
): { from: VotingPower; to: VotingPower } {
  const delegatedTo: VotingPower = {
    address: to,
    power: from.power,
    delegatedFrom: [...from.delegatedFrom, from.address],
    delegatedTo: null,
    snapshot: from.snapshot,
  };
  return {
    from: {
      ...from,
      power: BigInt(0),
      delegatedTo: to,
    },
    to: delegatedTo,
  };
}

export function calculateTotalVotingPower(
  power: VotingPower,
  delegations: VotingPower[]
): bigint {
  const delegated = delegations
    .filter((d) => d.delegatedTo === power.address)
    .reduce((sum, d) => sum + d.power, BigInt(0));
  return power.power + delegated;
}
