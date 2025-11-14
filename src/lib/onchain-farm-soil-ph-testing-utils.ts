import { type Address } from 'viem';

/**
 * Onchain farm soil pH testing utilities
 * pH test creation and verification
 */

export interface PHTest {
  id: string;
  plantationId: string;
  testedBy: Address;
  phLevel: number;
  depth: number;
  location: string;
  testDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createPHTest(
  address: Address,
  plantationId: string,
  phLevel: number,
  depth: number,
  location: string,
  testDate: bigint
): PHTest {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    testedBy: address,
    phLevel,
    depth,
    location,
    testDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

