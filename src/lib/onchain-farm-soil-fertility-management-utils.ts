import { type Address } from 'viem';

export interface FertilityAssessment {
  id: string;
  fieldId: bigint;
  nitrogenLevel: bigint;
  phosphorusLevel: bigint;
  potassiumLevel: bigint;
  organicMatter: bigint;
  phLevel: bigint;
  assessor: Address;
}

export function createFertilityAssessment(
  address: Address,
  fieldId: bigint,
  nitrogenLevel: bigint,
  phosphorusLevel: bigint,
  potassiumLevel: bigint,
  organicMatter: bigint,
  phLevel: bigint
): FertilityAssessment {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    nitrogenLevel,
    phosphorusLevel,
    potassiumLevel,
    organicMatter,
    phLevel,
    assessor: address,
  };
}

