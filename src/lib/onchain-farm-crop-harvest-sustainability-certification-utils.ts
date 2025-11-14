import { type Address } from 'viem';

/**
 * Onchain farm crop harvest sustainability certification utilities
 * Sustainability certification creation on blockchain
 */

export interface SustainabilityCertification {
  id: string;
  harvestId: string;
  certifiedBy: Address;
  certificationType: string;
  certifyingBody: string;
  certificationDate: bigint;
  standards: string[];
  verified: boolean;
  timestamp: bigint;
}

export function createSustainabilityCertification(
  address: Address,
  harvestId: string,
  certificationType: string,
  certifyingBody: string,
  certificationDate: bigint,
  standards: string[]
): SustainabilityCertification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    certifiedBy: address,
    certificationType,
    certifyingBody,
    certificationDate,
    standards,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

