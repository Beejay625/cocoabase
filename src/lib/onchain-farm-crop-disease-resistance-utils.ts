import { type Address } from 'viem';

/**
 * Onchain farm crop disease resistance utilities
 * Disease resistance recording and verification
 */

export interface DiseaseResistanceRecord {
  id: string;
  cropVariety: string;
  recordedBy: Address;
  diseaseType: string;
  resistanceLevel: number;
  testDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createResistanceRecord(
  address: Address,
  cropVariety: string,
  diseaseType: string,
  resistanceLevel: number,
  testDate: bigint
): DiseaseResistanceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    cropVariety,
    recordedBy: address,
    diseaseType,
    resistanceLevel,
    testDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

