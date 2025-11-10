import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createFinancialReport,
  type FinancialReport,
} from '@/lib/onchain-financial-reporting-system-utils';

export function useOnchainFinancialReportingSystem() {
  const { address } = useAccount();
  const [reports, setReports] = useState<FinancialReport[]>([]);

  const createReport = async (
    reportType: FinancialReport['reportType'],
    period: FinancialReport['period'],
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const report = createFinancialReport(address, reportType, period, amount);
    setReports([...reports, report]);
  };

  return { reports, createReport, address };
}
