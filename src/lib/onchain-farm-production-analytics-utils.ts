import { type Address } from 'viem';

export interface ProductionAnalytics {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  metric: string;
  value: bigint;
  period: string;
  recordedDate: bigint;
  txHash: string;
}

export function recordProductionMetric(
  owner: Address,
  plantationId: bigint,
  metric: string,
  value: bigint,
  period: string
): ProductionAnalytics {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    metric,
    value,
    period,
    recordedDate: BigInt(Date.now()),
    txHash: '',
  };
}

export function getMetricsByPlantation(
  analytics: ProductionAnalytics[],
  plantationId: bigint
): ProductionAnalytics[] {
  return analytics.filter((a) => a.plantationId === plantationId);
}

export function getMetricsByPeriod(
  analytics: ProductionAnalytics[],
  period: string
): ProductionAnalytics[] {
  return analytics.filter((a) => a.period === period);
}

export function calculateAverageMetric(
  analytics: ProductionAnalytics[],
  metric: string
): bigint {
  const relevant = analytics.filter((a) => a.metric === metric);
  if (relevant.length === 0) return BigInt(0);
  const total = relevant.reduce((sum, a) => sum + a.value, BigInt(0));
  return total / BigInt(relevant.length);
}
