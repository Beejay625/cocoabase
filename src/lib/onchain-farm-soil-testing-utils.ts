import { type Address } from 'viem';

export interface SoilTest {
  id: string;
  testId: bigint;
  plantationId: bigint;
  phLevel: bigint;
  nitrogenLevel: bigint;
  phosphorusLevel: bigint;
  potassiumLevel: bigint;
  testDate: bigint;
  tester: Address;
  verified: boolean;
}

export function createSoilTest(
  address: Address,
  plantationId: bigint,
  phLevel: bigint,
  nitrogenLevel: bigint,
  phosphorusLevel: bigint,
  potassiumLevel: bigint
): SoilTest {
  return {
    id: `${Date.now()}-${Math.random()}`,
    testId: BigInt(0),
    plantationId,
    phLevel,
    nitrogenLevel,
    phosphorusLevel,
    potassiumLevel,
    testDate: BigInt(Date.now()),
    tester: address,
    verified: false,
  };
}
