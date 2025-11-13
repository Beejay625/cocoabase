import { type Address } from 'viem';

export interface InsurancePolicy {
  id: string;
  policyId: bigint;
  policyholder: Address;
  coverageAmount: bigint;
  premium: bigint;
  startDate: bigint;
  endDate: bigint;
  coverageType: string;
  active: boolean;
  claimsCount: bigint;
}

export function createInsurancePolicy(
  policyholder: Address,
  policyId: bigint,
  coverageAmount: bigint,
  premium: bigint,
  startDate: bigint,
  endDate: bigint,
  coverageType: string
): InsurancePolicy {
  return {
    id: `${Date.now()}-${Math.random()}`,
    policyId,
    policyholder,
    coverageAmount,
    premium,
    startDate,
    endDate,
    coverageType,
    active: true,
    claimsCount: BigInt(0),
  };
}

