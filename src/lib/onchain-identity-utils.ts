import { type Address } from 'viem';

/**
 * Onchain identity utilities
 * Decentralized identity management
 */

export interface Identity {
  address: Address;
  credentials: string[];
  verified: boolean;
  reputation: number;
}

export function verifyIdentity(
  identity: Identity
): boolean {
  return identity.verified && identity.credentials.length > 0;
}

export function calculateReputationScore(
  identity: Identity,
  activities: number
): number {
  return identity.reputation + activities * 10;
}
