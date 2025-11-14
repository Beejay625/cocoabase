import { type Address } from 'viem';

export interface MortalityRecord {
  id: string;
  livestockId: bigint;
  cause: string;
  age: bigint;
  recorder: Address;
}

export function createMortalityRecord(
  address: Address,
  livestockId: bigint,
  cause: string,
  age: bigint
): MortalityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    cause,
    age,
    recorder: address,
  };
}
