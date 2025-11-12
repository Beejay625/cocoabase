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
