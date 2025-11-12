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
