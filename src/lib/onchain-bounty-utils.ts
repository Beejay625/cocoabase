import { type Address } from 'viem';

/**
 * Onchain bounty utilities
 * Decentralized bounty system for task completion
 */

export interface Bounty {
  id: bigint;
  creator: Address;
  title: string;
  description: string;
  reward: bigint;
  token: Address;
  status: 'open' | 'claimed' | 'cancelled';
  createdAt: bigint;
  expiresAt?: bigint;
  claimant?: Address;
}

export function createBounty(
  creator: Address,
  title: string,
  description: string,
  reward: bigint,
  token: Address,
  expiresAt?: bigint
): Bounty {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    creator,
    title,
    description,
    reward,
    token,
    status: 'open',
    createdAt: now,
    expiresAt,
  };
}

export function claimBounty(
  bounty: Bounty,
  claimant: Address,
  currentTime: bigint
): Bounty | null {
  if (bounty.status !== 'open') return null;
  if (bounty.expiresAt && currentTime > bounty.expiresAt) return null;
  if (bounty.creator === claimant) return null;

  return {
    ...bounty,
    status: 'claimed',
    claimant,
  };
}

export function isBountyExpired(
  bounty: Bounty,
  currentTime: bigint
): boolean {
  return (
    bounty.status === 'open' &&
    bounty.expiresAt !== undefined &&
    currentTime > bounty.expiresAt
  );
}

export function cancelBounty(
  bounty: Bounty,
  canceller: Address
): Bounty | null {
  if (bounty.status !== 'open') return null;
  if (bounty.creator !== canceller) return null;

  return {
    ...bounty,
    status: 'cancelled',
  };
}

export function calculateBountyFee(
  reward: bigint,
  feePercent: number = 0.02
): bigint {
  return (reward * BigInt(Math.floor(feePercent * 10000))) / BigInt(10000);
}

