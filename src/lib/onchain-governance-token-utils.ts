import { type Address } from 'viem';

export interface GovernanceToken {
  id: bigint;
  token: Address;
  totalSupply: bigint;
  votingPower: Map<Address, bigint>;
  proposals: bigint[];
}

export function createGovernanceToken(
  token: Address,
  totalSupply: bigint
): GovernanceToken {
  return {
    id: BigInt(0),
    token,
    totalSupply,
    votingPower: new Map(),
    proposals: [],
  };
}

