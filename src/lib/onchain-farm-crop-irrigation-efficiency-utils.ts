import { type Address } from 'viem';

/**
 * Onchain farm crop irrigation efficiency utilities
 * Irrigation efficiency recording and calculation
 */

export interface IrrigationEfficiency {
  id: string;
  plantationId: string;
  recordedBy: Address;
  waterApplied: bigint;
  waterUsed: bigint;
  efficiency?: number;
  efficiencyDate: bigint;
  timestamp: bigint;
}

export function createEfficiencyRecord(
  address: Address,
  plantationId: string,
  waterApplied: bigint,
  waterUsed: bigint,
  efficiencyDate: bigint
): IrrigationEfficiency {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    waterApplied,
    waterUsed,
    efficiencyDate,
    timestamp: BigInt(Date.now()),
  };
}

