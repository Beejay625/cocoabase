import { type Address } from 'viem';

/**
 * Onchain farm soil testing utilities
 * Soil test recording and verification
 */

export interface SoilTest {
  id: string;
  plantationId: string;
  testedBy: Address;
  phLevel: number;
  nitrogen: bigint;
  phosphorus: bigint;
  potassium: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createSoilTest(
  address: Address,
  plantationId: string,
  phLevel: number,
  nitrogen: bigint,
  phosphorus: bigint,
  potassium: bigint
): SoilTest {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    testedBy: address,
    phLevel,
    nitrogen,
    phosphorus,
    potassium,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

