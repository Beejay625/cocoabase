import { type Address } from 'viem';

/**
 * Onchain farm crop disease tracking utilities
 * Disease record and treatment tracking
 */

export interface DiseaseRecord {
  id: string;
  plantationId: string;
  recordedBy: Address;
  diseaseType: string;
  severity: number;
  affectedArea: bigint;
  treated: boolean;
  timestamp: bigint;
}

export function createDiseaseRecord(
  address: Address,
  plantationId: string,
  diseaseType: string,
  severity: number,
  affectedArea: bigint
): DiseaseRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    diseaseType,
    severity,
    affectedArea,
    treated: false,
    timestamp: BigInt(Date.now()),
  };
}

