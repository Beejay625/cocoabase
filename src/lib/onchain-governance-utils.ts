import { type Address } from 'viem';

/**
 * Onchain governance utilities
 * DAO governance and proposal management
 */

export interface GovernanceProposal {
  id: bigint;
  proposer: Address;
  description: string;
  votesFor: bigint;
  votesAgainst: bigint;
  quorum: bigint;
  deadline: bigint;
  executed: boolean;
}

export function hasQuorum(
  proposal: GovernanceProposal
): boolean {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  return totalVotes >= proposal.quorum;
}

export function canExecute(
  proposal: GovernanceProposal,
  currentTime: bigint
): boolean {
  return hasQuorum(proposal) && 
         currentTime >= proposal.deadline && 
         !proposal.executed;
}
