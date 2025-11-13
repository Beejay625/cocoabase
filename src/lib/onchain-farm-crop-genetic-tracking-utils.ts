import { type Address } from 'viem';

/**
 * Onchain farm crop genetic tracking utilities
 * Genetic record creation and verification
 */

export interface GeneticRecord {
  id: string;
  cropVariety: string;
  recordedBy: Address;
  geneticMarker: string;
  trait: string;
  recordDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createGeneticRecord(
  address: Address,
  cropVariety: string,
  geneticMarker: string,
  trait: string,
  recordDate: bigint
): GeneticRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    cropVariety,
    recordedBy: address,
    geneticMarker,
    trait,
    recordDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

