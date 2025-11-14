import { type Address } from 'viem';

/**
 * Onchain farm crop harvest dispute resolution utilities
 * Dispute creation on blockchain
 */

export interface Dispute {
  id: string;
  harvestId: string;
  createdBy: Address;
  disputant: Address;
  disputeReason: string;
  disputeDate: bigint;
  requestedResolution: string;
  resolution?: string;
  resolved: boolean;
  timestamp: bigint;
}

export function createDispute(
  address: Address,
  harvestId: string,
  disputant: Address,
  disputeReason: string,
  disputeDate: bigint,
  requestedResolution: string
): Dispute {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    disputant,
    disputeReason,
    disputeDate,
    requestedResolution,
    resolved: false,
    timestamp: BigInt(Date.now()),
  };
}

