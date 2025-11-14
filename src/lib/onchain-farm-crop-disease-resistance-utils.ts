import { type Address } from 'viem';

export interface DiseaseResistanceRecord {
  id: string;
  plantationId: bigint;
  cropType: string;
  diseaseType: string;
  resistanceLevel: bigint;
  testMethod: string;
  tester: Address;
  verified: boolean;
}

export function createDiseaseResistanceRecord(
  address: Address,
  plantationId: bigint,
  cropType: string,
  diseaseType: string,
  resistanceLevel: bigint,
  testMethod: string
): DiseaseResistanceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    diseaseType,
    resistanceLevel,
    testMethod,
    tester: address,
    verified: false,
  };
}
