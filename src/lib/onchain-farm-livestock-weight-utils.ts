import { type Address } from 'viem';

export interface WeightRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  weight: bigint;
  measurementDate: bigint;
  measurer: Address;
}

export function createWeightRecord(
  address: Address,
  livestockId: bigint,
  weight: bigint
): WeightRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    weight,
    measurementDate: BigInt(Date.now()),
    measurer: address,
  };
}
