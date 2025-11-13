import { type Address } from 'viem';

/**
 * Onchain farm insurance pool utilities
 * Insurance pool creation and management
 */

export interface InsurancePool {
  id: string;
  poolName: string;
  creator: Address;
  coverageType: string;
  premiumRate: bigint;
  totalContributions: bigint;
  memberCount: number;
  timestamp: bigint;
}

export function createInsurancePool(
  address: Address,
  poolName: string,
  coverageType: string,
  premiumRate: bigint
): InsurancePool {
  return {
    id: `${Date.now()}-${Math.random()}`,
    poolName,
    creator: address,
    coverageType,
    premiumRate,
    totalContributions: BigInt(0),
    memberCount: 0,
    timestamp: BigInt(Date.now()),
  };
}

