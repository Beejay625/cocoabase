import { type Address } from 'viem';

/**
 * Onchain farm crop harvest compliance utilities
 * Compliance record creation on blockchain
 */

export interface ComplianceRecord {
  id: string;
  harvestId: string;
  recordedBy: Address;
  standard: string;
  complianceStatus: string;
  auditDate: bigint;
  auditor: string;
  verified: boolean;
  timestamp: bigint;
}

export function createComplianceRecord(
  address: Address,
  harvestId: string,
  standard: string,
  complianceStatus: string,
  auditDate: bigint,
  auditor: string
): ComplianceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    recordedBy: address,
    standard,
    complianceStatus,
    auditDate,
    auditor,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

