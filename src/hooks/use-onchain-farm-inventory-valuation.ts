import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createInventoryItem,
  calculateItemValue,
  calculateTotalInventoryValue,
  getItemsByName,
  type InventoryItem,
} from '@/lib/onchain-farm-inventory-valuation-utils';

export function useOnchainFarmInventoryValuation() {
  const { address } = useAccount();
  const [items, setItems] = useState<InventoryItem[]>([]);

  const record = (
    itemName: string,
    quantity: bigint,
    unitPrice: bigint
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const item = createInventoryItem(address, itemName, quantity, unitPrice);
    setItems((prev) => [...prev, item]);
    console.log('Recording inventory item:', { itemName, quantity });
  };

  return {
    items,
    record,
    calculateItemValue,
    calculateTotalInventoryValue,
    getItemsByName,
    address,
  };
}
