import { type Address } from 'viem';

export interface Benchmark {
  id: bigint;
  creator: Address;
  metric: string;
  targetValue: bigint;
  actualValue: bigint;
  timestamp: bigint;
}

export function createBenchmark(
  creator: Address,
  metric: string,
  targetValue: bigint,
  actualValue: bigint
): Benchmark {
  return {
    id: BigInt(0),
    creator,
    metric,
    targetValue,
    actualValue,
    timestamp: BigInt(Date.now()),
  };
}
