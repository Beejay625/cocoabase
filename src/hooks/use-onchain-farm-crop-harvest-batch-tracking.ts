import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBatch,
  type HarvestBatch,
} from '@/lib/onchain-farm-crop-harvest-batch-tracking-utils';

/**
 * Hook for onchain farm crop harvest batch tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropHarvestBatchTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [batches, setBatches] = useState<HarvestBatch[]>([]);

  const createBatch = async (
    harvestId: string,
    batchNumber: string,
    quantity: bigint,
    batchDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const batch = createBatch(address, harvestId, batchNumber, quantity, batchDate);
    setBatches([...batches, batch]);
  };

  const updateBatch = async (
    contractAddress: Address,
    batchId: string,
    newQuantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateBatch',
      args: [batchId, newQuantity],
    });
  };

  return { batches, createBatch, updateBatch, address };
}

