import { type Address } from 'viem';

/**
 * Onchain farm organic certification utilities
 * Organic certification application and approval
 */

export interface OrganicCertification {
  id: string;
  plantationId: string;
  applicant: Address;
  certBody: string;
  standards: string[];
  applicationDate: bigint;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: bigint;
}

export function createOrganicCert(
  address: Address,
  plantationId: string,
  certBody: string,
  standards: string[],
  applicationDate: bigint
): OrganicCertification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    applicant: address,
    certBody,
    standards,
    applicationDate,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}

