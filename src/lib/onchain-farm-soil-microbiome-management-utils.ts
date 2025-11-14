import { type Address } from 'viem';

export interface MicrobiomeAssessment {
  id: string;
  fieldId: bigint;
  diversityScore: bigint;
  healthScore: bigint;
  microorganismTypes: string[];
  assessor: Address;
}

export function createMicrobiomeAssessment(
  address: Address,
  fieldId: bigint,
  diversityScore: bigint,
  healthScore: bigint,
  microorganismTypes: string[]
): MicrobiomeAssessment {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    diversityScore,
    healthScore,
    microorganismTypes,
    assessor: address,
  };
}

