import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  listData,
  purchaseData,
  type DataListing,
} from '@/lib/onchain-agricultural-data-marketplace-utils';

export function useOnchainAgriculturalDataMarketplace() {
  const { address } = useAccount();
  const [listings, setListings] = useState<DataListing[]>([]);

  const listDataForSale = async (
    dataType: string,
    price: bigint,
    description: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const listing = listData(address, dataType, price, description);
    setListings([...listings, listing]);
  };

  return { listings, listDataForSale, address };
}
