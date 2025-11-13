import { type Address } from 'viem';

/**
 * Onchain farm livestock health monitoring utilities
 * Livestock health record creation and updates
 */

export interface LivestockHealthRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  healthStatus: string;
  temperature: number;
  weight: bigint;
  checkDate: bigint;
  timestamp: bigint;
}

export function createHealthRecord(
  address: Address,
  animalId: string,
  healthStatus: string,
  temperature: number,
  weight: bigint,
  checkDate: bigint
): LivestockHealthRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    healthStatus,
    temperature,
    weight,
    checkDate,
    timestamp: BigInt(Date.now()),
  };
}

