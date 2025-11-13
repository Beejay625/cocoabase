import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createDataListing,
  type DataListing,
} from '@/lib/onchain-farm-data-monetization-utils';

/**
 * Hook for onchain farm data monetization
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmDataMonetization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<DataListing[]>([]);

  const listData = async (
    dataType: string,
    dataHash: string,
    price: bigint,
    accessDuration: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const listing = createDataListing(address, dataType, dataHash, price, accessDuration);
    setListings([...listings, listing]);
  };

  const purchaseDataAccess = async (
    contractAddress: Address,
    listingId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'purchaseDataAccess',
      args: [listingId],
    });
  };

  return { listings, listData, purchaseDataAccess, address };
}

