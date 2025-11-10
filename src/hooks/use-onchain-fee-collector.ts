import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeeCollector,
  collectFee,
  addBeneficiary,
  distributeFees,
  type FeeCollector,
} from '@/lib/onchain-fee-collector-utils';

export function useOnchainFeeCollector() {
  const { address } = useAccount();
  const [collectors, setCollectors] = useState<FeeCollector[]>([]);

  const collect = (collectorId: bigint, amount: bigint) => {
    const collector = collectors.find((c) => c.id === collectorId);
    if (!collector) throw new Error('Collector not found');
    const updated = collectFee(collector, amount);
    setCollectors((prev) =>
      prev.map((c) => (c.id === collectorId ? updated : c))
    );
    console.log('Collecting fee:', { collectorId, amount });
  };

  return {
    collectors,
    collect,
    addBeneficiary,
    distributeFees,
    address,
  };
}
