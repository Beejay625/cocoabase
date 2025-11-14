import { type Address } from 'viem';

/**
 * Onchain farm livestock health records utilities
 * Health record creation on blockchain
 */

export interface HealthRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  healthStatus: string;
  veterinarian: string;
  examinationDate: bigint;
  notes: string;
  timestamp: bigint;
}

export function createHealthRecord(
  address: Address,
  animalId: string,
  healthStatus: string,
  veterinarian: string,
  examinationDate: bigint,
  notes: string
): HealthRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    healthStatus,
    veterinarian,
    examinationDate,
    notes,
    timestamp: BigInt(Date.now()),
  };
}

