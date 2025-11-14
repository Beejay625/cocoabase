import { type Address } from 'viem';

/**
 * Onchain farm livestock vaccination utilities
 * Vaccination record creation and verification
 */

export interface VaccinationRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  vaccineType: string;
  vaccinationDate: bigint;
  nextDueDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createVaccinationRecord(
  address: Address,
  animalId: string,
  vaccineType: string,
  vaccinationDate: bigint,
  nextDueDate: bigint
): VaccinationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    vaccineType,
    vaccinationDate,
    nextDueDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

