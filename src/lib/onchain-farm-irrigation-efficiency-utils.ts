import { type Address } from 'viem';

/**
 * Onchain farm irrigation efficiency utilities
 * Irrigation efficiency tracking
 */

export interface IrrigationRecord {
  id: string;
  recordId: bigint;
  farmer: Address;
  location: string;
  timestamp: bigint;
  waterUsed: bigint;
  areaIrrigated: bigint;
  efficiency: bigint;
  irrigationMethod: string;
  cropType: string;
  cropYield: bigint;
}

export function createIrrigationRecord(
  address: Address,
  location: string,
  waterUsed: bigint,
  areaIrrigated: bigint,
  irrigationMethod: string,
  cropType: string,
  cropYield: bigint
): IrrigationRecord {
  const efficiency = (areaIrrigated * BigInt(100)) / waterUsed;

  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    farmer: address,
    location,
    timestamp: BigInt(Date.now()),
    waterUsed,
    areaIrrigated,
    efficiency,
    irrigationMethod,
    cropType,
    cropYield,
  };
}

