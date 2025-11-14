import { type Address } from 'viem';

export interface TransplantRecord {
  id: string;
  recordId: bigint;
  sourcePlantationId: bigint;
  targetPlantationId: bigint;
  plantsTransplanted: bigint;
  transplantDate: bigint;
  transplanter: Address;
}

export function createTransplantRecord(
  address: Address,
  sourcePlantationId: bigint,
  targetPlantationId: bigint,
  plantsTransplanted: bigint
): TransplantRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    sourcePlantationId,
    targetPlantationId,
    plantsTransplanted,
    transplantDate: BigInt(Date.now()),
    transplanter: address,
  };
}

