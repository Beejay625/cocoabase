import { type Address } from 'viem';

/**
 * Onchain allowlist utilities
 * Allowlist management with Merkle trees
 */

export interface Allowlist {
  id: bigint;
  name: string;
  merkleRoot: string;
  addresses: Address[];
  maxSize: number;
}

export function createAllowlist(
  name: string,
  merkleRoot: string,
  maxSize: number
): Allowlist {
  return {
    id: BigInt(0),
    name,
    merkleRoot,
    addresses: [],
    maxSize,
  };
}
