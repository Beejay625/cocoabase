import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createComplianceReport,
  type ComplianceReport,
} from '@/lib/onchain-farm-compliance-reporting-utils';

export function useOnchainFarmComplianceReporting() {
  const { address } = useAccount();
  const [reports, setReports] = useState<ComplianceReport[]>([]);

  const create = async (
    reportType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const report = createComplianceReport(address, reportType);
    setReports([...reports, report]);
  };

  return { reports, create, address };
}
