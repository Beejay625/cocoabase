import { type Address } from 'viem';

export interface EfficiencyRecord {
  id: string;
  plantationId: bigint;
  waterUsed: bigint;
  yieldProduced: bigint;
  efficiencyRatio: bigint;
  recorder: Address;
}

export function createEfficiencyRecord(
  address: Address,
  plantationId: bigint,
  waterUsed: bigint,
  yieldProduced: bigint
): EfficiencyRecord {
  const efficiencyRatio = (yieldProduced * 100n) / waterUsed;
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    waterUsed,
    yieldProduced,
    efficiencyRatio,
    recorder: address,
  };
}

