import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createInventoryItem,
  type InventoryItem,
} from '@/lib/onchain-farm-inventory-management-utils';

/**
 * Hook for onchain farm inventory management
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmInventoryManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [items, setItems] = useState<InventoryItem[]>([]);

  const addInventoryItem = async (
    itemName: string,
    category: string,
    quantity: bigint,
    unitPrice: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const item = createInventoryItem(address, itemName, category, quantity, unitPrice);
    setItems([...items, item]);
  };

  const updateQuantity = async (
    contractAddress: Address,
    itemId: string,
    newQuantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateQuantity',
      args: [itemId, newQuantity],
    });
  };

  return { items, addInventoryItem, updateQuantity, address };
}

