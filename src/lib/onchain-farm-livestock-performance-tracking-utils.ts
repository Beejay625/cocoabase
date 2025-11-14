import { type Address } from 'viem';

/**
 * Onchain farm livestock performance tracking utilities
 * Performance record creation on blockchain
 */

export interface PerformanceRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  performanceMetric: string;
  value: bigint;
  measurementDate: bigint;
  timestamp: bigint;
}

export function createPerformanceRecord(
  address: Address,
  animalId: string,
  performanceMetric: string,
  value: bigint,
  measurementDate: bigint
): PerformanceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    performanceMetric,
    value,
    measurementDate,
    timestamp: BigInt(Date.now()),
  };
}

