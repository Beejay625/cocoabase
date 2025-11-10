import { type Address } from 'viem';

export interface InsuranceClaim {
  id: bigint;
  claimant: Address;
  plantationId: bigint;
  claimType: 'drought' | 'flood' | 'pest' | 'disease' | 'weather';
  amount: bigint;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: bigint;
  txHash: string;
}

export function submitClaim(
  claimant: Address,
  plantationId: bigint,
  claimType: InsuranceClaim['claimType'],
  amount: bigint
): InsuranceClaim {
  return {
    id: BigInt(Date.now()),
    claimant,
    plantationId,
    claimType,
    amount,
    status: 'pending',
    submittedAt: BigInt(Date.now()),
    txHash: '',
  };
}

export function approveClaim(
  claim: InsuranceClaim,
  approver: Address
): InsuranceClaim {
  return {
    ...claim,
    status: 'approved',
  };
}

export function rejectClaim(
  claim: InsuranceClaim,
  rejector: Address
): InsuranceClaim {
  return {
    ...claim,
    status: 'rejected',
  };
}

export function getPendingClaims(claims: InsuranceClaim[]): InsuranceClaim[] {
  return claims.filter((claim) => claim.status === 'pending');
}
