import { type Address } from 'viem';

/**
 * Onchain farm crop variety testing utilities
 * Crop variety test creation and verification
 */

export interface CropVarietyTest {
  id: string;
  varietyName: string;
  testedBy: Address;
  yieldResult: bigint;
  qualityScore: number;
  testDate: bigint;
  location: string;
  verified: boolean;
  timestamp: bigint;
}

export function createVarietyTest(
  address: Address,
  varietyName: string,
  yieldResult: bigint,
  qualityScore: number,
  testDate: bigint,
  location: string
): CropVarietyTest {
  return {
    id: `${Date.now()}-${Math.random()}`,
    varietyName,
    testedBy: address,
    yieldResult,
    qualityScore,
    testDate,
    location,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

