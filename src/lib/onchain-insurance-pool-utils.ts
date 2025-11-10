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
  startTime: bigint;
  endTime: bigint;
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
  const now = BigInt(Date.now());
  return {
    pool: {
      ...pool,
      coverage: pool.coverage - coverage,
    },
    policy: {
      policyholder,
      coverage,
      premium,
      startTime: now,
      endTime: now + duration,
    },
  };
}

export function calculatePremium(
  coverage: bigint,
  premiumRate: number,
  duration: bigint
): bigint {
  const annualPremium = (coverage * BigInt(Math.floor(premiumRate * 100))) / BigInt(10000);
  return (annualPremium * duration) / BigInt(31536000);
}
