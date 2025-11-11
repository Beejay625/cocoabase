import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  listEquipment,
  type EquipmentListing,
} from '@/lib/onchain-farm-equipment-marketplace-utils';

export function useOnchainFarmEquipmentMarketplace() {
  const { address } = useAccount();
  const [listings, setListings] = useState<EquipmentListing[]>([]);

  const list = async (
    equipmentName: string,
    price: bigint,
    condition: EquipmentListing['condition']
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const listing = listEquipment(address, equipmentName, price, condition);
    setListings([...listings, listing]);
  };

  return { listings, list, address };
}
