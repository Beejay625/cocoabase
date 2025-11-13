import { type Address } from 'viem';

/**
 * Onchain farm livestock medication utilities
 * Medication record creation and verification
 */

export interface MedicationRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  medicationType: string;
  dosage: bigint;
  administrationDate: bigint;
  veterinarian: string;
  verified: boolean;
  timestamp: bigint;
}

export function createMedicationRecord(
  address: Address,
  animalId: string,
  medicationType: string,
  dosage: bigint,
  administrationDate: bigint,
  veterinarian: string
): MedicationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    medicationType,
    dosage,
    administrationDate,
    veterinarian,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

