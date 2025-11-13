import { type Address } from 'viem';

/**
 * Onchain farm seed certification utilities
 * Seed certification creation and verification
 */

export interface SeedCertification {
  id: string;
  seedId: string;
  certifiedBy: Address;
  seedType: string;
  certificationStandard: string;
  expiryDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createSeedCertification(
  address: Address,
  seedId: string,
  seedType: string,
  certificationStandard: string,
  expiryDate: bigint
): SeedCertification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    seedId,
    certifiedBy: address,
    seedType,
    certificationStandard,
    expiryDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

