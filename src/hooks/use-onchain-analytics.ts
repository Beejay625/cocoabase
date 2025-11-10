import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createAnalytics,
  updateAnalytics,
  calculateVolumeGrowth,
  type Analytics,
} from '@/lib/onchain-analytics-utils';

export function useOnchainAnalytics() {
  const { address } = useAccount();
  const [analytics, setAnalytics] = useState<Analytics[]>([]);

  const initializeAnalytics = (contract: Address) => {
    const newAnalytics = createAnalytics(contract);
    setAnalytics((prev) => [...prev, newAnalytics]);
    console.log('Initializing analytics:', newAnalytics);
  };

  const updateContractAnalytics = (
    contract: Address,
    volume: bigint,
    gasUsed: bigint
  ) => {
    const existing = analytics.find((a) => a.contract === contract);
    if (!existing) throw new Error('Analytics not found');
    const updated = updateAnalytics(existing, volume, gasUsed);
    setAnalytics((prev) =>
      prev.map((a) => (a.contract === contract ? updated : a))
    );
  };

  return {
    analytics,
    initializeAnalytics,
    updateContractAnalytics,
    calculateVolumeGrowth,
    address,
  };
}

