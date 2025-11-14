import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMortalityRecord,
  type MortalityRecord,
} from '@/lib/onchain-farm-livestock-mortality-tracking-utils';

/**
 * Hook for onchain farm livestock mortality tracking
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockMortalityTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<MortalityRecord[]>([]);

  const recordMortality = async (
    animalId: string,
    deathDate: bigint,
    causeOfDeath: string,
    disposalMethod: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createMortalityRecord(address, animalId, deathDate, causeOfDeath, disposalMethod);
    setRecords([...records, record]);
  };

  const verifyMortality = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyMortality',
      args: [recordId],
    });
  };

  return { records, recordMortality, verifyMortality, address };
}

