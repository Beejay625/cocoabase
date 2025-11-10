import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  addSeedToInventory,
  type SeedInventory,
} from '@/lib/onchain-seed-inventory-management-utils';

export function useOnchainSeedInventoryManagement() {
  const { address } = useAccount();
  const [inventory, setInventory] = useState<SeedInventory[]>([]);

  const addSeed = async (
    seedType: string,
    quantity: bigint,
    unit: string,
    expiryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const seed = addSeedToInventory(address, seedType, quantity, unit, expiryDate);
    setInventory([...inventory, seed]);
  };

  return { inventory, addSeed, address };
}
