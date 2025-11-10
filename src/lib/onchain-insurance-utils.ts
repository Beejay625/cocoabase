import { type Address } from 'viem';

/**
 * Onchain insurance utilities
 * Coverage tracking and claims management
 */

export interface InsurancePolicy {
  id: bigint;
  holder: Address;
  coverage: bigint;
  premium: bigint;
  startDate: bigint;
  endDate: bigint;
  active: boolean;
}

export interface InsuranceClaim {
  id: bigint;
  policyId: bigint;
  claimant: Address;
  amount: bigint;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: bigint;
}

export function calculatePremium(
  coverage: bigint,
  rate: number = 0.05
): bigint {
  return (coverage * BigInt(Math.floor(rate * 10000))) / BigInt(10000);
}

export function isPolicyActive(
  policy: InsurancePolicy,
  currentTime: bigint
): boolean {
  return (
    policy.active &&
    currentTime >= policy.startDate &&
    currentTime <= policy.endDate
  );
}

export function validateClaim(
  claim: InsuranceClaim,
  policy: InsurancePolicy
): boolean {
  return (
    claim.policyId === policy.id &&
    claim.amount <= policy.coverage &&
    isPolicyActive(policy, claim.timestamp)
  );
}

export function calculateCoverageAmount(
  assetValue: bigint,
  coveragePercent: number = 80
): bigint {
  return (assetValue * BigInt(coveragePercent)) / BigInt(100);
}

export function getClaimEligibility(
  policy: InsurancePolicy,
  claimAmount: bigint
): boolean {
  return claimAmount <= policy.coverage && policy.active;
}

export function calculatePolicyCost(
  coverage: bigint,
  duration: bigint,
  rate: number = 0.05
): bigint {
  const annualPremium = calculatePremium(coverage, rate);
  return (annualPremium * duration) / BigInt(365 * 24 * 60 * 60 * 1000);
}
