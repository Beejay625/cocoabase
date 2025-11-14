import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain commitment utilities
 * Commitment creation on blockchain
 */

export interface Commitment {
  id: string;
  harvestId: string;
  committedBy: Address;
  commitmentHash: string;
  commitmentDate: bigint;
  revealDate: bigint;
  revealed: boolean;
  timestamp: bigint;
}

export function createCommitment(
  address: Address,
  harvestId: string,
  commitmentHash: string,
  commitmentDate: bigint,
  revealDate: bigint
): Commitment {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    committedBy: address,
    commitmentHash,
    commitmentDate,
    revealDate,
    revealed: false,
    timestamp: BigInt(Date.now()),
  };
}

