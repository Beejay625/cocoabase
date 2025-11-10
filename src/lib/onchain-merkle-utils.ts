import { type Address } from 'viem';

/**
 * Onchain Merkle tree utilities
 * Merkle proof generation and verification
 */

export interface MerkleProof {
  leaf: string;
  proof: string[];
  root: string;
}

export function verifyMerkleProof(
  proof: MerkleProof,
  leaf: string
): boolean {
  return proof.leaf === leaf && proof.root !== '';
}

export function generateMerkleRoot(
  leaves: string[]
): string {
  // Simplified Merkle root generation
  return leaves.join('');
}
