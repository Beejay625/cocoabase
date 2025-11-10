import { type Address } from 'viem';

/**
 * Onchain Farm Insurance Policy Management utilities
 * Manage insurance policies onchain with Reown wallet integration
 */

export interface InsurancePolicy {
  id: bigint;
  farmer: Address;
  policyType: 'crop' | 'livestock' | 'equipment' | 'liability';
  coverageAmount: bigint;
  premium: bigint;
  deductible: bigint;
  startDate: bigint;
  endDate: bigint;
  status: 'active' | 'expired' | 'cancelled';
  claimsCount: number;
  createdAt: bigint;
}

export function createInsurancePolicy(
  farmer: Address,
  policyType: InsurancePolicy['policyType'],
  coverageAmount: bigint,
  premium: bigint,
  deductible: bigint,
  startDate: bigint,
  endDate: bigint
): InsurancePolicy {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    farmer,
    policyType,
    coverageAmount,
    premium,
    deductible,
    startDate,
    endDate,
    status: 'active',
    claimsCount: 0,
    createdAt: now,
  };
}

export function fileClaim(policy: InsurancePolicy): InsurancePolicy {
  return {
    ...policy,
    claimsCount: policy.claimsCount + 1,
  };
}

export function isPolicyExpired(policy: InsurancePolicy, currentTime: bigint): boolean {
  return currentTime > policy.endDate;
}

export function calculateClaimAmount(
  policy: InsurancePolicy,
  lossAmount: bigint
): bigint {
  if (lossAmount <= policy.deductible) return BigInt(0);
  return lossAmount - policy.deductible;
}

