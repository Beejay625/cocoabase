import { type Address } from 'viem';

/**
 * Onchain governance utilities
 * DAO governance for plantation management decisions
 */

export interface GovernanceProposal {
  id: bigint;
  proposer: Address;
  title: string;
  description: string;
  votesFor: bigint;
  votesAgainst: bigint;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  startTime: bigint;
  endTime: bigint;
  quorum: bigint;
}

export function createProposal(
  proposer: Address,
  title: string,
  description: string,
  duration: bigint,
  quorum: bigint
): GovernanceProposal {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    proposer,
    title,
    description,
    votesFor: BigInt(0),
    votesAgainst: BigInt(0),
    status: 'active',
    startTime: now,
    endTime: now + duration,
    quorum,
  };
}

