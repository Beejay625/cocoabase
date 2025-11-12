import { type Address } from 'viem';

export interface ImpactMeasurement {
  id: bigint;
  recorder: Address;
  impactType: 'environmental' | 'social' | 'economic';
  metric: string;
  value: bigint;
  timestamp: bigint;
}

export function createImpactMeasurement(
  recorder: Address,
  impactType: 'environmental' | 'social' | 'economic',
  metric: string,
  value: bigint
): ImpactMeasurement {
  return {
    id: BigInt(0),
    recorder,
    impactType,
    metric,
    value,
    timestamp: BigInt(Date.now()),
  };
}

export function getImpactsByType(
  measurements: ImpactMeasurement[],
  impactType: 'environmental' | 'social' | 'economic'
): ImpactMeasurement[] {
  return measurements.filter((m) => m.impactType === impactType);
}

export function calculateTotalImpact(
  measurements: ImpactMeasurement[],
  metric: string
): bigint {
  return measurements
    .filter((m) => m.metric === metric)
    .reduce((total, m) => total + m.value, BigInt(0));
}

export function getRecentMeasurements(
  measurements: ImpactMeasurement[],
  days: number
): ImpactMeasurement[] {
  const cutoff = BigInt(Date.now()) - BigInt(days * 24 * 60 * 60 * 1000);
  return measurements.filter((m) => m.timestamp >= cutoff);
}
