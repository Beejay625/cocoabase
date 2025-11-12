import { type Address } from 'viem';

export interface ProductionMetric {
  id: bigint;
  recorder: Address;
  plantation: Address;
  metric: string;
  value: bigint;
  period: string;
  timestamp: bigint;
}

export function createProductionMetric(
  recorder: Address,
  plantation: Address,
  metric: string,
  value: bigint,
  period: string
): ProductionMetric {
  return {
    id: BigInt(0),
    recorder,
    plantation,
    metric,
    value,
    period,
    timestamp: BigInt(Date.now()),
  };
}

export interface ProductionMetric {
  id: bigint;
  recorder: Address;
  plantation: Address;
  metric: string;
  value: bigint;
  period: string;
  timestamp: bigint;
}

export function createProductionMetric(
  recorder: Address,
  plantation: Address,
  metric: string,
  value: bigint,
  period: string
): ProductionMetric {
  return {
    id: BigInt(0),
    recorder,
    plantation,
    metric,
    value,
    period,
    timestamp: BigInt(Date.now()),
  };
}
