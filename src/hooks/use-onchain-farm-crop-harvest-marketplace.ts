import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMarketplaceListing,
  type MarketplaceListing,
} from '@/lib/onchain-farm-crop-harvest-marketplace-utils';

/**
 * Hook for onchain farm crop harvest marketplace
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);

  const createListing = async (
    harvestId: string,
    price: bigint,
    quantity: bigint,
    listingDate: bigint,
    description: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const listing = createMarketplaceListing(address, harvestId, price, quantity, listingDate, description);
    setListings([...listings, listing]);
  };

  const purchaseListing = async (
    contractAddress: Address,
    listingId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'purchaseListing',
      args: [listingId],
    });
  };

  return { listings, createListing, purchaseListing, address };
}

