import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSoilTest,
  type SoilTest,
} from '@/lib/onchain-farm-soil-testing-utils';

/**
 * Hook for onchain farm soil testing
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSoilTesting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [tests, setTests] = useState<SoilTest[]>([]);

  const recordSoilTest = async (
    plantationId: string,
    phLevel: number,
    nitrogen: bigint,
    phosphorus: bigint,
    potassium: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const test = createSoilTest(address, plantationId, phLevel, nitrogen, phosphorus, potassium);
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

  return { tests, recordSoilTest, verifyTest, address };
}

