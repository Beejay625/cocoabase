import { type Address } from 'viem';

export interface HousingAssessment {
  id: string;
  housingId: bigint;
  spaceScore: bigint;
  ventilationScore: bigint;
  cleanlinessScore: bigint;
  overallScore: bigint;
  assessor: Address;
}

export function createHousingAssessment(
  address: Address,
  housingId: bigint,
  spaceScore: bigint,
  ventilationScore: bigint,
  cleanlinessScore: bigint
): HousingAssessment {
  const overallScore = (spaceScore + ventilationScore + cleanlinessScore) / 3n;
  return {
    id: `${Date.now()}-${Math.random()}`,
    housingId,
    spaceScore,
    ventilationScore,
    cleanlinessScore,
    overallScore,
    assessor: address,
  };
}

