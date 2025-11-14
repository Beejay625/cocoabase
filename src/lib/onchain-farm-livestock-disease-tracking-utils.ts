import { type Address } from 'viem';

/**
 * Onchain farm livestock disease tracking utilities
 * Disease record creation on blockchain
 */

export interface DiseaseRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  diseaseName: string;
  diagnosisDate: bigint;
  veterinarian: string;
  treatment: string;
  timestamp: bigint;
}

export function createDiseaseRecord(
  address: Address,
  animalId: string,
  diseaseName: string,
  diagnosisDate: bigint,
  veterinarian: string,
  treatment: string
): DiseaseRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    diseaseName,
    diagnosisDate,
    veterinarian,
    treatment,
    timestamp: BigInt(Date.now()),
  };
}

