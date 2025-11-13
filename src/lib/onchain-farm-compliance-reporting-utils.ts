import { type Address } from 'viem';

export interface ComplianceReport {
  id: bigint;
  reporter: Address;
  reportType: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: bigint;
}

export function createComplianceReport(
  reporter: Address,
  reportType: string
): ComplianceReport {
  return {
    id: BigInt(Date.now()),
    reporter,
    reportType,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}

export function approveReport(
  report: ComplianceReport
): ComplianceReport {
  return {
    ...report,
    status: 'approved',
  };
}

export function getPendingReports(
  reports: ComplianceReport[]
): ComplianceReport[] {
  return reports.filter((r) => r.status === 'pending');
}
