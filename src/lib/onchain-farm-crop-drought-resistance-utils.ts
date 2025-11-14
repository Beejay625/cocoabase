import { type Address } from 'viem';

export interface ResistanceRecord {
  id: string;
  plantationId: bigint;
  cropType: string;
  resistanceLevel: bigint;
  testDuration: bigint;
  tester: Address;
}

export function createResistanceRecord(
  address: Address,
  plantationId: bigint,
  cropType: string,
  resistanceLevel: bigint,
  testDuration: bigint
): ResistanceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    resistanceLevel,
    testDuration,
    tester: address,
  };
}

