import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain consensus utilities
 * Consensus record creation on blockchain
 */

export interface ConsensusRecord {
  id: string;
  harvestId: string;
  createdBy: Address;
  proposal: string;
  voters: Address[];
  consensusDate: bigint;
  approved: boolean;
  timestamp: bigint;
}

export function createConsensusRecord(
  address: Address,
  harvestId: string,
  proposal: string,
  voters: Address[],
  consensusDate: bigint
): ConsensusRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    proposal,
    voters,
    consensusDate,
    approved: false,
    timestamp: BigInt(Date.now()),
  };
}

