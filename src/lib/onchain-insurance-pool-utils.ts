import { type Address } from 'viem';

export interface InsurancePool {
  id: bigint;
  token: Address;
  premiumRate: number;
  coverage: bigint;
  claims: bigint;
  status: 'active' | 'paused' | 'closed';
}

export interface InsurancePolicy {
  policyholder: Address;
  coverage: bigint;
  premium: bigint;
  expiresAt: bigint;
  active: boolean;
}

export function createInsurancePool(
  token: Address,
  premiumRate: number,
  coverage: bigint
): InsurancePool {
  return {
    id: BigInt(0),
    token,
    premiumRate,
    coverage,
    claims: BigInt(0),
    status: 'active',
  };
}

export function purchasePolicy(
  pool: InsurancePool,
  policyholder: Address,
  coverage: bigint,
  duration: bigint
): { pool: InsurancePool; policy: InsurancePolicy } {
  const premium = (coverage * BigInt(Math.floor(pool.premiumRate * 100))) / BigInt(10000);
  const expiresAt = BigInt(Date.now()) + duration;
  return {
    pool: {
      ...pool,
      coverage: pool.coverage - coverage,
    },
    policy: {
      policyholder,
      coverage,
      premium,
      expiresAt,
      active: true,
    },
  };
}

export function fileClaim(
  pool: InsurancePool,
  claimAmount: bigint
): InsurancePool | null {
  if (pool.claims + claimAmount > pool.coverage) return null;
  return {
    ...pool,
    claims: pool.claims + claimAmount,
  };
}
