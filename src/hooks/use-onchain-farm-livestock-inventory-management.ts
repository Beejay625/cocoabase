import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createInventoryRecord,
  type InventoryRecord,
} from '@/lib/onchain-farm-livestock-inventory-management-utils';

/**
 * Hook for onchain farm livestock inventory management
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockInventoryManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<InventoryRecord[]>([]);

  const recordInventory = async (
    animalId: string,
    location: string,
    status: string,
    recordDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createInventoryRecord(address, animalId, location, status, recordDate);
    setRecords([...records, record]);
  };

  const updateInventory = async (
    contractAddress: Address,
    recordId: string,
    newStatus: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateInventory',
      args: [recordId, newStatus],
    });
  };

  return { records, recordInventory, updateInventory, address };
}

