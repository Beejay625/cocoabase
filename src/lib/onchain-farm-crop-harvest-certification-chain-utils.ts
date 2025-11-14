import { type Address } from 'viem';

/**
 * Onchain farm crop harvest certification chain utilities
 * Certification chain creation and verification
 */

export interface CertificationChain {
  id: string;
  harvestId: string;
  linkedBy: Address;
  previousCertId: string;
  newCertId: string;
  linkDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createCertificationLink(
  address: Address,
  harvestId: string,
  previousCertId: string,
  newCertId: string,
  linkDate: bigint
): CertificationChain {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    linkedBy: address,
    previousCertId,
    newCertId,
    linkDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

