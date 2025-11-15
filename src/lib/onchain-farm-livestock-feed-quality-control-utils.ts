import { type Address } from 'viem';

export interface QualityTest {
  id: string;
  feedBatchId: bigint;
  proteinContent: bigint;
  moistureContent: bigint;
  contaminationLevel: bigint;
  passed: boolean;
  tester: Address;
}

export function createQualityTest(
  address: Address,
  feedBatchId: bigint,
  proteinContent: bigint,
  moistureContent: bigint,
  contaminationLevel: bigint
): QualityTest {
  const passed = proteinContent >= 15n && moistureContent <= 12n && contaminationLevel < 5n;
  return {
    id: `${Date.now()}-${Math.random()}`,
    feedBatchId,
    proteinContent,
    moistureContent,
    contaminationLevel,
    passed,
    tester: address,
  };
}


