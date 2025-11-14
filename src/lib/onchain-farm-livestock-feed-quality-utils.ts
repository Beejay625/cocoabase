import { type Address } from 'viem';

/**
 * Onchain farm livestock feed quality utilities
 * Feed quality test creation on blockchain
 */

export interface FeedQualityTest {
  id: string;
  feedBatchId: string;
  testedBy: Address;
  testType: string;
  testResults: string[];
  testDate: bigint;
  tester: string;
  approved: boolean;
  timestamp: bigint;
}

export function createFeedQualityTest(
  address: Address,
  feedBatchId: string,
  testType: string,
  testResults: string[],
  testDate: bigint,
  tester: string
): FeedQualityTest {
  return {
    id: `${Date.now()}-${Math.random()}`,
    feedBatchId,
    testedBy: address,
    testType,
    testResults,
    testDate,
    tester,
    approved: false,
    timestamp: BigInt(Date.now()),
  };
}

