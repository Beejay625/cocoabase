import { type Address } from 'viem';

/**
 * Onchain farm crop harvest sustainability metrics utilities
 * Sustainability metrics creation on blockchain
 */

export interface SustainabilityMetrics {
  id: string;
  harvestId: string;
  recordedBy: Address;
  waterUsage: bigint;
  carbonFootprint: bigint;
  biodiversityScore: number;
  recordDate: bigint;
  timestamp: bigint;
}

export function createSustainabilityMetrics(
  address: Address,
  harvestId: string,
  waterUsage: bigint,
  carbonFootprint: bigint,
  biodiversityScore: number,
  recordDate: bigint
): SustainabilityMetrics {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    recordedBy: address,
    waterUsage,
    carbonFootprint,
    biodiversityScore,
    recordDate,
    timestamp: BigInt(Date.now()),
  };
}

