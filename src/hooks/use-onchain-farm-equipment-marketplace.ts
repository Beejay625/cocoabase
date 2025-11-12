import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEquipmentListing,
  purchaseEquipment,
  getAvailableEquipment,
  getEquipmentByCondition,
  type EquipmentListing,
} from '@/lib/onchain-farm-equipment-marketplace-utils';

export function useOnchainFarmEquipmentMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<EquipmentListing[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const purchase = async (listingId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsPurchasing(true);
    try {
      const listing = listings.find((l) => l.id === listingId);
      if (!listing) throw new Error('Listing not found');
      const updated = purchaseEquipment(listing, address);
      console.log('Purchasing equipment:', { listingId });
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    listings,
    purchase,
    getAvailableEquipment,
    getEquipmentByCondition,
    isPurchasing,
    address,
  };
}
