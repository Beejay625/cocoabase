import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBatchRecord,
  type BatchRecord,
} from '@/lib/onchain-farm-crop-harvest-blockchain-batch-utils';

/**
 * Hook for onchain farm crop harvest blockchain batch
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainBatch() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<BatchRecord[]>([]);

  const createBatch = async (
    harvestIds: string[],
    batchHash: string,
    batchDate: bigint,
    batchType: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createBatchRecord(address, harvestIds, batchHash, batchDate, batchType);
    setRecords([...records, record]);
  };

  const verifyBatch = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyBatch',
      args: [recordId],
    });
  };

  return { records, createBatch, verifyBatch, address };
}

