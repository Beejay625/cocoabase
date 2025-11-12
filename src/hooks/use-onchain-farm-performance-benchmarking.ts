import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createBenchmark,
  type Benchmark,
} from '@/lib/onchain-farm-performance-benchmarking-utils';

export function useOnchainFarmPerformanceBenchmarking() {
  const { address } = useAccount();
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);

  const create = async (
    metric: string,
    value: bigint,
    industryAverage: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const benchmark = createBenchmark(address, metric, value, industryAverage);
    setBenchmarks([...benchmarks, benchmark]);
  };

  return { benchmarks, create, address };
}
