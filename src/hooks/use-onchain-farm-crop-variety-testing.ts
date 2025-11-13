import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createVarietyTest,
  type CropVarietyTest,
} from '@/lib/onchain-farm-crop-variety-testing-utils';

/**
 * Hook for onchain farm crop variety testing
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropVarietyTesting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [tests, setTests] = useState<CropVarietyTest[]>([]);

  const testVariety = async (
    varietyName: string,
    yieldResult: bigint,
    qualityScore: number,
    testDate: bigint,
    location: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const test = createVarietyTest(address, varietyName, yieldResult, qualityScore, testDate, location);
    setTests([...tests, test]);
  };

  const verifyTest = async (
    contractAddress: Address,
    testId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyTest',
      args: [testId],
    });
  };

  return { tests, testVariety, verifyTest, address };
}

