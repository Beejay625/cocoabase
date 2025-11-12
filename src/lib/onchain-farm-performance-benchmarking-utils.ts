import { type Address } from 'viem';

export interface Benchmark {
  id: bigint;
  owner: Address;
  metric: string;
  value: bigint;
  benchmarkDate: bigint;
  industryAverage: bigint;
  txHash: string;
}

export function createBenchmark(
  owner: Address,
  metric: string,
  value: bigint,
  industryAverage: bigint
): Benchmark {
  return {
    id: BigInt(Date.now()),
    owner,
    metric,
    value,
    benchmarkDate: BigInt(Date.now()),
    industryAverage,
    txHash: '',
  };
}

export function calculatePerformanceRatio(
  benchmark: Benchmark
): number {
  return Number(benchmark.value) / Number(benchmark.industryAverage);
}

export function isAboveAverage(
  benchmark: Benchmark
): boolean {
  return benchmark.value > benchmark.industryAverage;
}

export function getBenchmarksByMetric(
  benchmarks: Benchmark[],
  metric: string
): Benchmark[] {
  return benchmarks.filter((b) => b.metric === metric);
}
