import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createOrder,
  type CommodityOrder,
} from '@/lib/onchain-agricultural-commodity-exchange-utils';

export function useOnchainAgriculturalCommodityExchange() {
  const { address } = useAccount();
  const [orders, setOrders] = useState<CommodityOrder[]>([]);

  const create = async (
    commodity: string,
    quantity: bigint,
    price: bigint,
    orderType: CommodityOrder['orderType']
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const order = createOrder(address, commodity, quantity, price, orderType);
    setOrders([...orders, order]);
  };

  return { orders, create, address };
}
