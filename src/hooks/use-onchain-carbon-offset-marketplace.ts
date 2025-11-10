import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCarbonOffsetListing,
  purchaseCarbonOffset,
  calculateCarbonOffsetValue,
  cancelCarbonOffsetListing,
  verifyCarbonCertification,
  type CarbonOffset,
} from '@/lib/onchain-carbon-offset-marketplace-utils';

/**
 * Hook for onchain carbon offset marketplace operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainCarbonOffsetMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<CarbonOffset[]>([]);
  const [isListing, setIsListing] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const listCarbonOffset = async (
    amount: bigint,
    price: bigint,
    certification: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    if (!verifyCarbonCertification(certification)) {
      throw new Error('Invalid carbon certification');
    }
    setIsListing(true);
    try {
      const listing = createCarbonOffsetListing(address, amount, price, certification);
      setListings((prev) => [...prev, listing]);
      console.log('Listing carbon offset:', listing);
      // Onchain listing via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'listCarbonOffset',
        args: [amount, price, certification],
      });
    } finally {
      setIsListing(false);
    }
  };

  const purchaseCarbonCredit = async (
    listingId: bigint,
    purchaseAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsPurchasing(true);
    try {
      const listing = listings.find((l) => l.id === listingId);
      if (!listing) throw new Error('Listing not found');
      const updated = purchaseCarbonOffset(listing, address, purchaseAmount);
      if (updated) {
        setListings((prev) =>
          prev.map((l) => (l.id === listingId ? updated : l))
        );
        console.log('Purchasing carbon offset:', { listingId, address, purchaseAmount });
        // Onchain purchase via smart contract
        await writeContract({
          address: '0x0000000000000000000000000000000000000000' as Address,
          abi: [],
          functionName: 'purchaseCarbonOffset',
          args: [listingId, purchaseAmount],
        });
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    listings,
    listCarbonOffset,
    purchaseCarbonCredit,
    calculateCarbonOffsetValue,
    cancelCarbonOffsetListing,
    verifyCarbonCertification,
    isListing,
    isPurchasing,
    address,
  };
}

