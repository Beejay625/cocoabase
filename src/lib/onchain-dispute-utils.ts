import { type Address } from 'viem';

/**
 * Onchain dispute resolution utilities
 * Dispute handling and arbitration
 */

export interface Dispute {
  id: bigint;
  escrowId: bigint;
  claimant: Address;
  respondent: Address;
  reason: string;
  status: 'open' | 'resolved' | 'rejected';
  createdAt: bigint;
  resolution: string | null;
}

export interface Arbitrator {
  address: Address;
  reputation: number;
  fees: bigint;
  casesResolved: number;
}

export function createDispute(
  escrowId: bigint,
  claimant: Address,
  respondent: Address,
  reason: string
): Dispute {
  return {
    id: BigInt(0),
    escrowId,
    claimant,
    respondent,
    reason,
    status: 'open',
    createdAt: BigInt(Date.now()),
    resolution: null,
  };
}

export function canFileDispute(
  escrow: { buyer: Address; seller: Address; status: string },
  filer: Address
): boolean {
  return (
    escrow.status === 'pending' &&
    (filer === escrow.buyer || filer === escrow.seller)
  );
}

export function resolveDispute(
  dispute: Dispute,
  resolution: string,
  winner: Address
): Dispute {
  return {
    ...dispute,
    status: 'resolved',
    resolution,
  };
}

export function calculateArbitrationFee(
  escrowAmount: bigint,
  feePercent: number = 0.02
): bigint {
  return (escrowAmount * BigInt(Math.floor(feePercent * 10000))) / BigInt(10000);
}

export function selectArbitrator(
  arbitrators: Arbitrator[]
): Arbitrator | null {
  if (arbitrators.length === 0) return null;
  return arbitrators.reduce((best, current) =>
    current.reputation > best.reputation ? current : best
  );
}

export function isDisputeResolvable(
  dispute: Dispute,
  arbitrators: Arbitrator[]
): boolean {
  return dispute.status === 'open' && arbitrators.length > 0;
}
