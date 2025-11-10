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

/**
 * Check if proposal passed
 */
export function isProposalPassed(proposal: Proposal): boolean {
  return proposal.votesFor > proposal.votesAgainst && !proposal.executed;
}

/**
 * Calculate quorum threshold
 */
export function calculateQuorum(
  totalSupply: bigint,
  quorumPercent: number = 4
): bigint {
  return (totalSupply * BigInt(quorumPercent)) / BigInt(100);
}

/**
 * Check if quorum is met
 */
export function hasQuorum(
  totalVotes: bigint,
  quorumThreshold: bigint
): boolean {
  return totalVotes >= quorumThreshold;
}

/**
 * Calculate voting deadline
 */
export function calculateVotingDeadline(
  startBlock: bigint,
  votingPeriod: bigint
): bigint {
  return startBlock + votingPeriod;
}

