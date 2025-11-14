import { type Address } from 'viem';

/**
 * Onchain farm harvest quality utilities
 * Harvest quality grading
 */

export interface QualityGrade {
  id: string;
  gradeId: bigint;
  farmer: Address;
  harvestId: bigint;
  grade: string;
  score: bigint;
  characteristics: string;
  timestamp: bigint;
  inspector: string;
  isCertified: boolean;
}

export function createQualityGrade(
  address: Address,
  harvestId: bigint,
  grade: string,
  score: bigint,
  characteristics: string,
  inspector: string,
  isCertified: boolean
): QualityGrade {
  return {
    id: `${Date.now()}-${Math.random()}`,
    gradeId: BigInt(0),
    farmer: address,
    harvestId,
    grade,
    score,
    characteristics,
    timestamp: BigInt(Date.now()),
    inspector,
    isCertified,
  };
}

