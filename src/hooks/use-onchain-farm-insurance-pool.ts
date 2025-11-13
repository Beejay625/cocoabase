import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createInsurancePool,
  type InsurancePool,
} from '@/lib/onchain-farm-insurance-pool-utils';

/**
 * Hook for onchain farm insurance pool
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmInsurancePool() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pools, setPools] = useState<InsurancePool[]>([]);

  const createPool = async (
    poolName: string,
    coverageType: string,
    premiumRate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const pool = createInsurancePool(address, poolName, coverageType, premiumRate);
    setPools([...pools, pool]);
  };

  const joinPool = async (
    contractAddress: Address,
    poolId: string,
    contribution: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'joinPool',
      args: [poolId, contribution],
    });
  };

  return { pools, createPool, joinPool, address };
}

