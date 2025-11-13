import { type Address } from 'viem';

/**
 * Onchain farm export certification utilities
 * Export certification application and approval
 */

export interface ExportCertification {
  id: string;
  productId: string;
  applicant: Address;
  destinationCountry: string;
  standards: string[];
  status: 'pending' | 'approved' | 'rejected';
  timestamp: bigint;
}

export function createCertification(
  address: Address,
  productId: string,
  destinationCountry: string,
  standards: string[]
): ExportCertification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    productId,
    applicant: address,
    destinationCountry,
    standards,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}

