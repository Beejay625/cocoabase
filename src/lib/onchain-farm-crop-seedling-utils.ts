import { type Address } from 'viem';

export interface SeedlingRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  seedlingsPlanted: bigint;
  plantingDate: bigint;
  seedlingType: string;
  planter: Address;
}

export function createSeedlingRecord(
  address: Address,
  plantationId: bigint,
  seedlingsPlanted: bigint,
  seedlingType: string
): SeedlingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    seedlingsPlanted,
    plantingDate: BigInt(Date.now()),
    seedlingType,
    planter: address,
  };
}

