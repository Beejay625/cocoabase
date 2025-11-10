import { type Address } from 'viem';

/**
 * Onchain Livestock Health Records utilities
 * Track livestock health onchain with Reown wallet integration
 */

export interface LivestockHealthRecord {
  id: bigint;
  farmer: Address;
  animalId: string;
  animalType: string;
  healthStatus: 'healthy' | 'sick' | 'recovering' | 'quarantine';
  symptoms: string[];
  treatment: string;
  veterinarian: string;
  recordDate: bigint;
  nextCheckup: bigint;
}

export function createHealthRecord(
  farmer: Address,
  animalId: string,
  animalType: string,
  healthStatus: LivestockHealthRecord['healthStatus'],
  symptoms: string[],
  treatment: string,
  veterinarian: string,
  nextCheckup: bigint
): LivestockHealthRecord {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    farmer,
    animalId,
    animalType,
    healthStatus,
    symptoms,
    treatment,
    veterinarian,
    recordDate: now,
    nextCheckup,
  };
}

export function updateHealthStatus(
  record: LivestockHealthRecord,
  newStatus: LivestockHealthRecord['healthStatus']
): LivestockHealthRecord {
  return {
    ...record,
    healthStatus: newStatus,
  };
}

export function isCheckupDue(record: LivestockHealthRecord, currentTime: bigint): boolean {
  return currentTime >= record.nextCheckup;
}

export function calculateHealthScore(record: LivestockHealthRecord): number {
  const statusScores = {
    healthy: 100,
    recovering: 75,
    sick: 50,
    quarantine: 25,
  };
  return statusScores[record.healthStatus];
}

