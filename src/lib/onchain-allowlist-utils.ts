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

export function addToAllowlist(
  allowlist: Allowlist,
  address: Address
): Allowlist {
  if (allowlist.addresses.length >= allowlist.maxSize) return allowlist;
  if (allowlist.addresses.includes(address)) return allowlist;
  return {
    ...allowlist,
    addresses: [...allowlist.addresses, address],
  };
}

export function removeFromAllowlist(
  allowlist: Allowlist,
  address: Address
): Allowlist {
  return {
    ...allowlist,
    addresses: allowlist.addresses.filter(addr => addr !== address),
  };
}
