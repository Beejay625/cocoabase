import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain merkle tree utilities
 * Merkle tree creation on blockchain
 */

export interface MerkleTree {
  id: string;
  harvestId: string;
  createdBy: Address;
  rootHash: string;
  leaves: string[];
  creationDate: bigint;
  timestamp: bigint;
}

export function createMerkleTree(
  address: Address,
  harvestId: string,
  rootHash: string,
  leaves: string[],
  creationDate: bigint
): MerkleTree {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    rootHash,
    leaves,
    creationDate,
    timestamp: BigInt(Date.now()),
  };
}

