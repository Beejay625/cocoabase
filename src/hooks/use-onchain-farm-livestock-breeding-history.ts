import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBreedingHistory,
  type BreedingHistory,
} from '@/lib/onchain-farm-livestock-breeding-history-utils';

/**
 * Hook for onchain farm livestock breeding history
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBreedingHistory() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [histories, setHistories] = useState<BreedingHistory[]>([]);

  const recordBreeding = async (
    animalId: string,
    mateId: string,
    breedingDate: bigint,
    breedingMethod: string,
    success: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const history = createBreedingHistory(address, animalId, mateId, breedingDate, breedingMethod, success);
    setHistories([...histories, history]);
  };

  const updateBreeding = async (
    contractAddress: Address,
    historyId: string,
    newSuccess: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateBreeding',
      args: [historyId, newSuccess],
    });
  };

  return { histories, recordBreeding, updateBreeding, address };
}

