import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeedInventory,
  type FeedInventory,
} from '@/lib/onchain-farm-livestock-feed-inventory-utils';

/**
 * Hook for onchain farm livestock feed inventory
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockFeedInventory() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [inventories, setInventories] = useState<FeedInventory[]>([]);

  const recordInventory = async (
    feedType: string,
    quantity: bigint,
    location: string,
    recordDate: bigint,
    supplier: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const inventory = createFeedInventory(address, feedType, quantity, location, recordDate, supplier);
    setInventories([...inventories, inventory]);
  };

  const updateInventory = async (
    contractAddress: Address,
    inventoryId: string,
    newQuantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateInventory',
      args: [inventoryId, newQuantity],
    });
  };

  return { inventories, recordInventory, updateInventory, address };
}

