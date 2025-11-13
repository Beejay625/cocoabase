import { type Address } from 'viem';

/**
 * Onchain farm sustainability metrics utilities
 * Sustainability metrics recording and scoring
 */

export interface SustainabilityMetrics {
  id: string;
  plantationId: string;
  recordedBy: Address;
  carbonFootprint: bigint;
  waterUsage: bigint;
  biodiversityScore: number;
  soilHealthScore: number;
  overallScore?: number;
  timestamp: bigint;
}

export function createMetrics(
  address: Address,
  plantationId: string,
  carbonFootprint: bigint,
  waterUsage: bigint,
  biodiversityScore: number,
  soilHealthScore: number
): SustainabilityMetrics {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    carbonFootprint,
    waterUsage,
    biodiversityScore,
    soilHealthScore,
    timestamp: BigInt(Date.now()),
  };
}

