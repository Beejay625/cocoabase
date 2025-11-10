import { type Address } from 'viem';

/**
 * DAO and governance utilities
 * Voting, proposals, and onchain governance
 */

export interface Proposal {
  id: bigint;
  proposer: Address;
  description: string;
  votesFor: bigint;
  votesAgainst: bigint;
  startBlock: bigint;
  endBlock: bigint;
  executed: boolean;
}

export interface Vote {
  voter: Address;
  proposalId: bigint;
  support: boolean;
  weight: bigint;
}

/**
 * Calculate voting power
 */
export function calculateVotingPower(
  tokenBalance: bigint,
  multiplier: number = 1
): bigint {
  return tokenBalance * BigInt(multiplier);
}

