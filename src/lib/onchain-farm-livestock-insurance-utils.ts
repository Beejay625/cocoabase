import { type Address } from 'viem';

/**
 * Onchain farm livestock insurance utilities
 * Insurance policy creation on blockchain
 */

export interface InsurancePolicy {
  id: string;
  animalId: string;
  createdBy: Address;
  coverageAmount: bigint;
  premium: bigint;
  policyStartDate: bigint;
  policyEndDate: bigint;
  insurer: string;
  timestamp: bigint;
}

export function createInsurancePolicy(
  address: Address,
  animalId: string,
  coverageAmount: bigint,
  premium: bigint,
  policyStartDate: bigint,
  policyEndDate: bigint,
  insurer: string
): InsurancePolicy {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    createdBy: address,
    coverageAmount,
    premium,
    policyStartDate,
    policyEndDate,
    insurer,
    timestamp: BigInt(Date.now()),
  };
}

