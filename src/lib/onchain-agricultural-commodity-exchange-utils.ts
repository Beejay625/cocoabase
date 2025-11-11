import { type Address } from 'viem';

export interface CommodityOrder {
  id: bigint;
  trader: Address;
  commodity: string;
  quantity: bigint;
  price: bigint;
  orderType: 'buy' | 'sell';
  orderDate: bigint;
  status: 'open' | 'filled' | 'cancelled';
  txHash: string;
}

export function createOrder(
  trader: Address,
  commodity: string,
  quantity: bigint,
  price: bigint,
  orderType: CommodityOrder['orderType']
): CommodityOrder {
  return {
    id: BigInt(Date.now()),
    trader,
    commodity,
    quantity,
    price,
    orderType,
    orderDate: BigInt(Date.now()),
    status: 'open',
    txHash: '',
  };
}
