import { type Address } from 'viem';

export interface Benchmark {
  id: string;
  benchmarkId: bigint;
  farmOwner: Address;
  metric: bigint;
  metricType: string;
  benchmarkValue: bigint;
  actualValue: bigint;
  date: bigint;
  exceedsBenchmark: boolean;
}

export function createBenchmark(
  farmOwner: Address,
  benchmarkId: bigint,
  benchmarkValue: bigint,
  metricType: string
): Benchmark {
  return {
    id: `${Date.now()}-${Math.random()}`,
    benchmarkId,
    farmOwner,
    metric: BigInt(0),
    metricType,
    benchmarkValue,
    actualValue: BigInt(0),
    date: BigInt(Date.now()),
    exceedsBenchmark: false,
  };
}
