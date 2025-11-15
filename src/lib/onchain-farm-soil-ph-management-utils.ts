import { type Address } from 'viem';

export interface PhReading {
  id: string;
  fieldId: bigint;
  phLevel: bigint;
  depth: bigint;
  reader: Address;
}

export function createPhReading(
  address: Address,
  fieldId: bigint,
  phLevel: bigint,
  depth: bigint
): PhReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    phLevel,
    depth,
    reader: address,
  };
}


