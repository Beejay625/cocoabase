import { type Address } from 'viem';

export interface EfficiencyMetric {
  id: bigint;
  owner: Address;
  resourceType: string;
  inputAmount: bigint;
  outputAmount: bigint;
  efficiencyRatio: number;
  metricDate: bigint;
  txHash: string;
}

export function createEfficiencyMetric(
  owner: Address,
  resourceType: string,
  inputAmount: bigint,
  outputAmount: bigint
): EfficiencyMetric {
  const efficiencyRatio = Number(outputAmount) / Number(inputAmount);
  return {
    id: BigInt(Date.now()),
    owner,
    resourceType,
    inputAmount,
    outputAmount,
    efficiencyRatio,
    metricDate: BigInt(Date.now()),
    txHash: '',
  };
}

export function getMetricsByResource(
  metrics: EfficiencyMetric[],
  resourceType: string
): EfficiencyMetric[] {
  return metrics.filter((m) => m.resourceType === resourceType);
}

export function getAverageEfficiency(
  metrics: EfficiencyMetric[]
): number {
  if (metrics.length === 0) return 0;
  const total = metrics.reduce((sum, m) => sum + m.efficiencyRatio, 0);
  return total / metrics.length;
}

export function isEfficient(
  metric: EfficiencyMetric,
  threshold: number
): boolean {
  return metric.efficiencyRatio >= threshold;
}
