import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  updatePrice,
  getLatestPrice,
  getPricesByMarket,
  getPriceHistory,
  type CommodityPrice,
} from '@/lib/onchain-agricultural-commodity-pricing-utils';

export function useOnchainAgriculturalCommodityPricing() {
  const { address } = useAccount();
  const [prices, setPrices] = useState<CommodityPrice[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const update = async (
    commodity: string,
    price: bigint,
    market: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsUpdating(true);
    try {
      const commodityPrice = updatePrice(address, commodity, price, market);
      setPrices((prev) => [...prev, commodityPrice]);
      console.log('Updating price:', commodityPrice);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    prices,
    update,
    getLatestPrice,
    getPricesByMarket,
    getPriceHistory,
    isUpdating,
    address,
  };
}
