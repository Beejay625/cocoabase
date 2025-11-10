import { type Address } from 'viem';

/**
 * Onchain voting system utilities
 * Token-weighted voting with onchain verification
 */

export interface Vote {
  voter: Address;
  proposalId: bigint;
  support: boolean;
  weight: bigint;
  timestamp: bigint;
}

export interface VotingProposal {
  id: bigint;
  creator: Address;
  title: string;
  description: string;
  startTime: bigint;
  endTime: bigint;
  votesFor: bigint;
  votesAgainst: bigint;
  quorum: bigint;
  executed: boolean;
}

export function calculateVoteWeight(
  tokenBalance: bigint,
  multiplier: number = 1
): bigint {
  return tokenBalance * BigInt(multiplier);
}

export function hasVotingPower(
  balance: bigint,
  minimum: bigint = BigInt(1)
): boolean {
  return balance >= minimum;
}

export function isProposalActive(
  proposal: VotingProposal,
  currentTime: bigint
): boolean {
  return (
    currentTime >= proposal.startTime &&
    currentTime <= proposal.endTime &&
    !proposal.executed
  );
}

export function calculateVoteOutcome(proposal: VotingProposal): 'passed' | 'failed' | 'pending' {
  if (proposal.executed) return 'passed';
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  if (totalVotes < proposal.quorum) return 'pending';
  return proposal.votesFor > proposal.votesAgainst ? 'passed' : 'failed';
}

export function getVotingPower(address: Address, tokenBalance: bigint): bigint {
  return calculateVoteWeight(tokenBalance, 1);
}

export function validateVotingProposal(proposal: VotingProposal): boolean {
  return (
    proposal.startTime < proposal.endTime &&
    proposal.quorum > BigInt(0) &&
    proposal.title.length > 0
  );
}

