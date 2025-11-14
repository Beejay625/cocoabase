import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPHTest,
  type PHTest,
} from '@/lib/onchain-farm-soil-ph-testing-utils';

/**
 * Hook for onchain farm soil pH testing
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSoilPHTesting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [tests, setTests] = useState<PHTest[]>([]);

  const recordPHTest = async (
    plantationId: string,
    phLevel: number,
    depth: number,
    location: string,
    testDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const test = createPHTest(address, plantationId, phLevel, depth, location, testDate);
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

  return { tests, recordPHTest, verifyTest, address };
}

