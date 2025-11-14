import { type Address } from 'viem';

export interface CompactionReading {
  id: string;
  fieldId: bigint;
  compactionLevel: bigint;
  depth: bigint;
  recorder: Address;
}

export function createCompactionReading(
  address: Address,
  fieldId: bigint,
  compactionLevel: bigint,
  depth: bigint
): CompactionReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    compactionLevel,
    depth,
    recorder: address,
  };
}
