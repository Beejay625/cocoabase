import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeedQualityTest,
  type FeedQualityTest,
} from '@/lib/onchain-farm-livestock-feed-quality-utils';

/**
 * Hook for onchain farm livestock feed quality
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockFeedQuality() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [tests, setTests] = useState<FeedQualityTest[]>([]);

  const testFeedQuality = async (
    feedBatchId: string,
    testType: string,
    testResults: string[],
    testDate: bigint,
    tester: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const test = createFeedQualityTest(address, feedBatchId, testType, testResults, testDate, tester);
    setTests([...tests, test]);
  };

  const approveFeedQuality = async (
    contractAddress: Address,
    testId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'approveFeedQuality',
      args: [testId],
    });
  };

  return { tests, testFeedQuality, approveFeedQuality, address };
}

