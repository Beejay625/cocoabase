import { type Address } from 'viem';

export interface StopLossOrder {
  id: bigint;
  owner: Address;
  token: Address;
  amount: bigint;
  stopPrice: bigint;
  status: 'active' | 'triggered' | 'cancelled';
  createdAt: bigint;
}

export function createStopLossOrder(
  owner: Address,
  token: Address,
  amount: bigint,
  stopPrice: bigint
): StopLossOrder {
  return {
    id: BigInt(0),
    owner,
    token,
    amount,
    stopPrice,
    status: 'active',
    createdAt: BigInt(Date.now()),
  };
}

export function triggerStopLoss(
  order: StopLossOrder,
  currentPrice: bigint
): StopLossOrder | null {
  if (order.status !== 'active') return null;
  if (currentPrice > order.stopPrice) return null;
  return { ...order, status: 'triggered' };
}

export function cancelStopLoss(order: StopLossOrder): StopLossOrder | null {
  if (order.status !== 'active') return null;
  return { ...order, status: 'cancelled' };
}

