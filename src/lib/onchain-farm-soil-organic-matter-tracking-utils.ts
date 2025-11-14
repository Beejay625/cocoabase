import { type Address } from 'viem';

export interface OrganicMatterReading {
  id: string;
  fieldId: bigint;
  organicMatterPercentage: bigint;
  depth: bigint;
  recorder: Address;
}

export function createOrganicMatterReading(
  address: Address,
  fieldId: bigint,
  organicMatterPercentage: bigint,
  depth: bigint
): OrganicMatterReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    organicMatterPercentage,
    depth,
    recorder: address,
  };
}

