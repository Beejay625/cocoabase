import { type Address } from 'viem';

export interface IntercroppingSystem {
  id: string;
  fieldId: bigint;
  cropTypes: string[];
  spacing: bigint;
  implementer: Address;
}

export function createIntercroppingSystem(
  address: Address,
  fieldId: bigint,
  cropTypes: string[],
  spacing: bigint
): IntercroppingSystem {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    cropTypes,
    spacing,
    implementer: address,
  };
}

