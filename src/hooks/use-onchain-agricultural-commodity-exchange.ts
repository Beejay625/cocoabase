import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOrder,
  fillOrder,
  getOpenOrders,
  getOrdersByCommodity,
  type CommodityOrder,
} from '@/lib/onchain-agricultural-commodity-exchange-utils';

export function useOnchainAgriculturalCommodityExchange() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [orders, setOrders] = useState<CommodityOrder[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const create = async (
    commodity: string,
    orderType: 'buy' | 'sell',
    quantity: bigint,
    price: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const order = createOrder(address, commodity, orderType, quantity, price);
      console.log('Creating order:', order);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    orders,
    create,
    fillOrder,
    getOpenOrders,
    getOrdersByCommodity,
    isCreating,
    address,
  };
}
