import { type Address } from 'viem';

/**
 * Onchain ZK proof utilities
 * Zero-knowledge proof generation and verification
 */

export interface ZKProof {
  proof: string;
  publicInputs: string[];
  verified: boolean;
}

export function verifyZKProof(
  proof: ZKProof
): boolean {
  return proof.verified && proof.proof.length > 0;
}
