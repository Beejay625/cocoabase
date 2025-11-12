import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createComparison,
  type YieldComparison,
} from '@/lib/onchain-agricultural-yield-comparison-system-utils';

export function useOnchainAgriculturalYieldComparisonSystem() {
  const { address } = useAccount();
  const [comparisons, setComparisons] = useState<YieldComparison[]>([]);

  const create = async (
    cropType: string,
    yieldAmount: bigint,
    comparisonPeriod: string,
    benchmarkYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const comparison = createComparison(address, cropType, yieldAmount, comparisonPeriod, benchmarkYield);
    setComparisons([...comparisons, comparison]);
  };

  return { comparisons, create, address };
}
