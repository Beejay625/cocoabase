import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createStorageSlot,
  updateStorageSlot,
  calculateStorageSlot,
  type StorageSlot,
} from '@/lib/onchain-storage-utils';

export function useOnchainStorage() {
  const { address } = useAccount();
  const [slots, setSlots] = useState<StorageSlot[]>([]);

  const createSlot = (contract: Address, slot: bigint, value: string) => {
    const newSlot = createStorageSlot(contract, slot, value);
    setSlots((prev) => [...prev, newSlot]);
    console.log('Creating storage slot:', newSlot);
  };

  return {
    slots,
    createSlot,
    updateStorageSlot,
    calculateStorageSlot,
    address,
  };
}

