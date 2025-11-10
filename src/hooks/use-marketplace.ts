import { useState } from 'react';
import { type Address } from 'viem';
import {
  calculateMarketplaceFee,
  calculateSellerProceeds,
  isOfferValid,
  type MarketplaceListing,
  type MarketplaceOffer,
} from '@/lib/onchain-marketplace-utils';

/**
 * Hook for marketplace operations
 */
export function useMarketplace() {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [offers, setOffers] = useState<MarketplaceOffer[]>([]);

  const calculateFee = (price: bigint, feePercent: number = 2.5) => {
    return calculateMarketplaceFee(price, feePercent);
  };

  const calculateProceeds = (price: bigint, feePercent: number = 2.5) => {
    return calculateSellerProceeds(price, feePercent);
  };

  const validateOffer = (offer: MarketplaceOffer) => {
    return isOfferValid(offer);
  };

  return {
    listings,
    offers,
    calculateFee,
    calculateProceeds,
    validateOffer,
  };
}

