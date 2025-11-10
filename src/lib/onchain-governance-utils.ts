import { type Address } from 'viem';

export interface GovernanceProposal {
  id: bigint;
  proposer: Address;
  title: string;
  description: string;
  votesFor: bigint;
  votesAgainst: bigint;
  status: 'pending' | 'active' | 'passed' | 'rejected' | 'executed';
  startTime: bigint;
  endTime: bigint;
  executionData?: string;
}

export function createProposal(
  proposer: Address,
  title: string,
  description: string,
  duration: bigint,
  executionData?: string
): GovernanceProposal {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    proposer,
    title,
    description,
    votesFor: BigInt(0),
    votesAgainst: BigInt(0),
    status: 'pending',
    startTime: now,
    endTime: now + duration,
    executionData,
  };
}

export function voteOnProposal(
  proposal: GovernanceProposal,
  voter: Address,
  support: boolean,
  weight: bigint,
  currentTime: bigint
): GovernanceProposal | null {
  if (proposal.status !== 'active') return null;
  if (currentTime >= proposal.endTime) return null;

  return {
    ...proposal,
    votesFor: support
      ? proposal.votesFor + weight
      : proposal.votesFor,
    votesAgainst: support
      ? proposal.votesAgainst
      : proposal.votesAgainst + weight,
  };
}

export function executeProposal(
  proposal: GovernanceProposal,
  currentTime: bigint
): GovernanceProposal | null {
  if (proposal.status !== 'passed') return null;
  if (currentTime < proposal.endTime) return null;

  return {
    ...proposal,
    status: 'executed',
  };
}

export function calculateVoteMargin(
  proposal: GovernanceProposal
): number {
  const total = proposal.votesFor + proposal.votesAgainst;
  if (total === BigInt(0)) return 0;
  return Number((proposal.votesFor * BigInt(10000)) / total) / 100;
}
