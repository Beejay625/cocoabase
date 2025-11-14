import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFinalityRecord,
  type FinalityRecord,
} from '@/lib/onchain-farm-crop-harvest-blockchain-finality-utils';

/**
 * Hook for onchain farm crop harvest blockchain finality
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainFinality() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<FinalityRecord[]>([]);

  const finalize = async (
    harvestId: string,
    finalityType: string,
    finalityDate: bigint,
    confirmations: number
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createFinalityRecord(address, harvestId, finalityType, finalityDate, confirmations);
    setRecords([...records, record]);
  };

  const confirmFinality = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'confirmFinality',
      args: [recordId],
    });
  };

  return { records, finalize, confirmFinality, address };
}

