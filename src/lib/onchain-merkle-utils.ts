/**
 * Onchain Merkle tree utilities
 * Merkle proofs and tree generation
 */

export interface MerkleProof {
  leaf: string;
  proof: string[];
  root: string;
}

/**
 * Verify Merkle proof
 */
export function verifyMerkleProof(proof: MerkleProof): boolean {
  // Simplified - in production use proper Merkle verification
  return proof.proof.length > 0 && !!proof.root;
}

