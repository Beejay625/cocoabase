import { type Address } from 'viem';

export interface ResistanceRecord {
  id: string;
  plantationId: bigint;
  cropType: string;
  pestType: string;
  resistanceLevel: bigint;
  testMethod: string;
  tester: Address;
  verified: boolean;
}

export function createResistanceRecord(
  address: Address,
  plantationId: bigint,
  cropType: string,
  pestType: string,
  resistanceLevel: bigint,
  testMethod: string
): ResistanceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    pestType,
    resistanceLevel,
    testMethod,
    tester: address,
    verified: false,
  };
}


