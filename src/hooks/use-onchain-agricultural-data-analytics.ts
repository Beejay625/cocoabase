import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAnalyticsReport,
  calculateMetrics,
  generateInsights,
  type AnalyticsReport,
} from '@/lib/onchain-agricultural-data-analytics-utils';

/**
 * Hook for onchain agricultural data analytics operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainAgriculturalDataAnalytics() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [reports, setReports] = useState<AnalyticsReport[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async (
    reportType: AnalyticsReport['reportType'],
    dataPoints: number[]
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsGenerating(true);
    try {
      const report = createAnalyticsReport(address, reportType, dataPoints);
      setReports((prev) => [...prev, report]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'generateAnalyticsReport',
        args: [reportType, dataPoints],
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    reports,
    generateReport,
    calculateMetrics,
    generateInsights,
    isGenerating,
    address,
  };
}

