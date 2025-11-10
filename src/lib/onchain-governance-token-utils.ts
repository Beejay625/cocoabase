import { type Address } from 'viem';

export interface GovernanceToken {
  id: bigint;
  token: Address;
  totalSupply: bigint;
  delegates: Map<Address, Address>;
  votes: Map<Address, bigint>;
}

export function createGovernanceToken(token: Address): GovernanceToken {
  return {
    id: BigInt(0),
    token,
    totalSupply: BigInt(0),
    delegates: new Map(),
    votes: new Map(),
  };
}
