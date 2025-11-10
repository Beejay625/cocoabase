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

export function delegateVotes(
  token: GovernanceToken,
  delegator: Address,
  delegatee: Address,
  balance: bigint
): GovernanceToken {
  const newDelegates = new Map(token.delegates);
  const newVotes = new Map(token.votes);
  const currentDelegate = newDelegates.get(delegator);
  if (currentDelegate) {
    const currentVotes = newVotes.get(currentDelegate) || BigInt(0);
    newVotes.set(currentDelegate, currentVotes - balance);
  }
  newDelegates.set(delegator, delegatee);
  const delegateeVotes = newVotes.get(delegatee) || BigInt(0);
  newVotes.set(delegatee, delegateeVotes + balance);
  return {
    ...token,
    delegates: newDelegates,
    votes: newVotes,
  };
}

export function getVotes(
  token: GovernanceToken,
  account: Address
): bigint {
  return token.votes.get(account) || BigInt(0);
}

export function getCurrentVotes(
  token: GovernanceToken,
  account: Address
): bigint {
  return getVotes(token, account);
}
