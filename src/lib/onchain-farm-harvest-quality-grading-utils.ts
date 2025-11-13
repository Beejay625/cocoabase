import { type Address } from 'viem';

/**
 * Onchain farm harvest quality grading utilities
 * Harvest quality grading and verification
 */

export interface QualityGrade {
  id: string;
  harvestId: string;
  gradedBy: Address;
  grade: string;
  qualityScore: number;
  inspectorNotes: string;
  verified: boolean;
  timestamp: bigint;
}

export function createQualityGrade(
  address: Address,
  harvestId: string,
  grade: string,
  qualityScore: number,
  inspectorNotes: string
): QualityGrade {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    gradedBy: address,
    grade,
    qualityScore,
    inspectorNotes,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

