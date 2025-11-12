import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createEfficiencyMetric,
  type EfficiencyMetric,
} from '@/lib/onchain-farm-resource-efficiency-metrics-utils';

export function useOnchainFarmResourceEfficiencyMetrics() {
  const { address } = useAccount();
  const [metrics, setMetrics] = useState<EfficiencyMetric[]>([]);

  const create = async (
    resourceType: string,
    inputAmount: bigint,
    outputAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const metric = createEfficiencyMetric(address, resourceType, inputAmount, outputAmount);
    setMetrics([...metrics, metric]);
  };

  return { metrics, create, address };
}
