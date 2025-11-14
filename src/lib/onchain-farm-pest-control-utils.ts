import { type Address } from 'viem';

/**
 * Onchain farm pest control utilities
 * Pest control management
 */

export interface PestControlRecord {
  id: string;
  recordId: bigint;
  farmer: Address;
  cropId: bigint;
  pestType: string;
  controlMethod: string;
  treatmentDate: bigint;
  effectiveness: bigint;
  notes: string;
  isEffective: boolean;
}

export function createPestControlRecord(
  address: Address,
  cropId: bigint,
  pestType: string,
  controlMethod: string,
  treatmentDate: bigint,
  effectiveness: bigint,
  notes: string
): PestControlRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    farmer: address,
    cropId,
    pestType,
    controlMethod,
    treatmentDate,
    effectiveness,
    notes,
    isEffective: effectiveness >= BigInt(70),
  };
}

