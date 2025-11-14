import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain governance utilities
 * Governance proposal creation on blockchain
 */

export interface GovernanceProposal {
  id: string;
  harvestId: string;
  createdBy: Address;
  proposal: string;
  votingPeriod: number;
  proposalDate: bigint;
  approved: boolean;
  timestamp: bigint;
}

export function createGovernanceProposal(
  address: Address,
  harvestId: string,
  proposal: string,
  votingPeriod: number,
  proposalDate: bigint
): GovernanceProposal {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    proposal,
    votingPeriod,
    proposalDate,
    approved: false,
    timestamp: BigInt(Date.now()),
  };
}

