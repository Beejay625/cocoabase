import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createSeedInventory,
  type SeedInventory,
} from '@/lib/onchain-farm-seed-inventory-utils';

export function useOnchainFarmSeedInventory() {
  const { address } = useAccount();
  const [inventory, setInventory] = useState<SeedInventory[]>([]);

  const create = async (
    seedType: string,
    quantity: bigint,
    expiryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const item = createSeedInventory(address, seedType, quantity, expiryDate);
    setInventory([...inventory, item]);
  };

  return { inventory, create, address };
}
