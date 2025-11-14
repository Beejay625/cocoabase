import { type Address } from 'viem';

export interface QualityTest {
  id: string;
  testId: bigint;
  sourceId: bigint;
  phLevel: bigint;
  turbidity: bigint;
  testDate: bigint;
  tester: Address;
  safe: boolean;
}

export function createQualityTest(
  address: Address,
  sourceId: bigint,
  phLevel: bigint,
  turbidity: bigint
): QualityTest {
  const safe = phLevel >= BigInt(65) && phLevel <= BigInt(85) && turbidity <= BigInt(50);
  return {
    id: `${Date.now()}-${Math.random()}`,
    testId: BigInt(0),
    sourceId,
    phLevel,
    turbidity,
    testDate: BigInt(Date.now()),
    tester: address,
    safe,
  };
}

