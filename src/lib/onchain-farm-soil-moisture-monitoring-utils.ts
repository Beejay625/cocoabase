import { type Address } from 'viem';

export interface MoistureReading {
  id: string;
  fieldId: bigint;
  moistureLevel: bigint;
  depth: bigint;
  temperature: bigint;
  location: string;
  recorder: Address;
}

export function createMoistureReading(
  address: Address,
  fieldId: bigint,
  moistureLevel: bigint,
  depth: bigint,
  temperature: bigint,
  location: string
): MoistureReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    moistureLevel,
    depth,
    temperature,
    location,
    recorder: address,
  };
}

