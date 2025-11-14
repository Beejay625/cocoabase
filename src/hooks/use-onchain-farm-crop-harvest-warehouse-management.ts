import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWarehouseRecord,
  type WarehouseRecord,
} from '@/lib/onchain-farm-crop-harvest-warehouse-management-utils';

/**
 * Hook for onchain farm crop harvest warehouse management
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestWarehouseManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<WarehouseRecord[]>([]);

  const recordWarehouse = async (
    harvestId: string,
    warehouseLocation: string,
    storageType: string,
    quantity: bigint,
    entryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createWarehouseRecord(address, harvestId, warehouseLocation, storageType, quantity, entryDate);
    setRecords([...records, record]);
  };

  const updateWarehouse = async (
    contractAddress: Address,
    recordId: string,
    newQuantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateWarehouse',
      args: [recordId, newQuantity],
    });
  };

  return { records, recordWarehouse, updateWarehouse, address };
}

