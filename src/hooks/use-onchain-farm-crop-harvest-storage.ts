import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createStorageRecord,
  type HarvestStorage,
} from '@/lib/onchain-farm-crop-harvest-storage-utils';

/**
 * Hook for onchain farm crop harvest storage
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropHarvestStorage() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [storages, setStorages] = useState<HarvestStorage[]>([]);

  const storeHarvest = async (
    harvestId: string,
    storageLocation: string,
    quantity: bigint,
    storageDate: bigint,
    conditions: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const storage = createStorageRecord(address, harvestId, storageLocation, quantity, storageDate, conditions);
    setStorages([...storages, storage]);
  };

  const retrieveHarvest = async (
    contractAddress: Address,
    storageId: string,
    quantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'retrieveHarvest',
      args: [storageId, quantity],
    });
  };

  return { storages, storeHarvest, retrieveHarvest, address };
}

