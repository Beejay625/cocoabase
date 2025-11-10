import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createDividendDistribution,
  recordShareholder,
  addDividends,
  calculateDividendShare,
  type DividendDistribution,
} from '@/lib/onchain-dividend-distribution-utils';

export function useOnchainDividendDistribution() {
  const { address } = useAccount();
  const [distributions, setDistributions] = useState<DividendDistribution[]>([]);

  const record = (
    distributionId: bigint,
    shareholder: Address,
    shares: bigint
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const distribution = distributions.find((d) => d.id === distributionId);
    if (!distribution) throw new Error('Distribution not found');
    const updated = recordShareholder(distribution, shareholder, shares);
    setDistributions((prev) =>
      prev.map((d) => (d.id === distributionId ? updated : d))
    );
    console.log('Recording shareholder:', { distributionId, shareholder, shares });
  };

  return {
    distributions,
    record,
    addDividends,
    calculateDividendShare,
    address,
  };
}

