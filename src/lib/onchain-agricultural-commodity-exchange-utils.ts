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

export function fillOrder(
  order: CommodityOrder
): CommodityOrder {
  return {
    ...order,
    status: 'filled',
  };
}

export function getOpenOrders(
  orders: CommodityOrder[]
): CommodityOrder[] {
  return orders.filter((o) => o.status === 'open');
}

export function getOrdersByCommodity(
  orders: CommodityOrder[],
  commodity: string
): CommodityOrder[] {
  return orders.filter((o) => o.commodity === commodity);
}
