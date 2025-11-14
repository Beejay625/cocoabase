import { type Address } from 'viem';

/**
 * Onchain farm farmer cooperative utilities
 * Farmer cooperative management
 */

export interface CooperativeMember {
  farmer: Address;
  shares: bigint;
  joinDate: bigint;
  isActive: boolean;
  contribution: bigint;
}

export interface Proposal {
  id: string;
  proposalId: bigint;
  proposer: Address;
  description: string;
  votingDeadline: bigint;
  votesFor: bigint;
  votesAgainst: bigint;
  executed: boolean;
}

export function createCooperativeMember(
  address: Address,
  shares: bigint,
  contribution: bigint
): CooperativeMember {
  return {
    farmer: address,
    shares,
    joinDate: BigInt(Date.now()),
    isActive: true,
    contribution,
  };
}

export function createProposal(
  address: Address,
  description: string,
  votingDeadline: bigint
): Proposal {
  return {
    id: `${Date.now()}-${Math.random()}`,
    proposalId: BigInt(0),
    proposer: address,
    description,
    votingDeadline,
    votesFor: BigInt(0),
    votesAgainst: BigInt(0),
    executed: false,
  };
}

