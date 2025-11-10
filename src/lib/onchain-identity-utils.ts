import { type Address } from 'viem';

/**
 * Onchain identity utilities
 * ENS, identity verification, and wallet reputation
 */

export interface OnchainIdentity {
  address: Address;
  ensName?: string;
  avatar?: string;
  verified: boolean;
}

/**
 * Format ENS name or address
 */
export function formatIdentity(identity: OnchainIdentity): string {
  return identity.ensName || identity.address;
}

/**
 * Check if identity is verified
 */
export function isIdentityVerified(identity: OnchainIdentity): boolean {
  return identity.verified && !!identity.address;
}

/**
 * Get identity display name
 */
export function getIdentityDisplayName(identity: OnchainIdentity): string {
  if (identity.ensName) return identity.ensName;
  return `${identity.address.slice(0, 6)}...${identity.address.slice(-4)}`;
}

