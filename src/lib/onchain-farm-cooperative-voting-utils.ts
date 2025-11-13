import { type Address } from 'viem';

/**
 * Onchain farm cooperative voting utilities
 * Proposal creation and voting management
 */

export interface Vote {
  id: string;
  proposalTitle: string;
  description: string;
  proposer: Address;
  votingPeriod: number;
  startTime: bigint;
  endTime: bigint;
  yesVotes: bigint;
  noVotes: bigint;
  status: 'active' | 'passed' | 'rejected' | 'expired';
}

export function createVote(
  address: Address,
  proposalTitle: string,
  description: string,
  votingPeriod: number
): Vote {
  const startTime = BigInt(Date.now());
  const endTime = BigInt(Date.now() + votingPeriod * 24 * 60 * 60 * 1000);
  return {
    id: `${Date.now()}-${Math.random()}`,
    proposalTitle,
    description,
    proposer: address,
    votingPeriod,
    startTime,
    endTime,
    yesVotes: BigInt(0),
    noVotes: BigInt(0),
    status: 'active',
  };
}

