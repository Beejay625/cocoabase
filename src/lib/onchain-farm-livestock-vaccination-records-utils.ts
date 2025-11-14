import { type Address } from 'viem';

/**
 * Onchain farm livestock vaccination records utilities
 * Vaccination record creation on blockchain
 */

export interface VaccinationRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  vaccineType: string;
  vaccinationDate: bigint;
  veterinarian: string;
  batchNumber: string;
  verified: boolean;
  timestamp: bigint;
}

export function createVaccinationRecord(
  address: Address,
  animalId: string,
  vaccineType: string,
  vaccinationDate: bigint,
  veterinarian: string,
  batchNumber: string
): VaccinationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    vaccineType,
    vaccinationDate,
    veterinarian,
    batchNumber,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

