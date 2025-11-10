import { type Address } from 'viem';

export interface InsurancePool {
  id: bigint;
  token: Address;
  premiumRate: number;
  coverage: bigint;
  claims: bigint;
  status: 'active' | 'paused' | 'closed';
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

