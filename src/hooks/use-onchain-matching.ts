import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOrder,
  matchOrders,
  cancelOrder,
  isOrderExpired,
  type Order,
} from '@/lib/onchain-matching-utils';

export function useOnchainMatching() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  const createNewOrder = async (
    tokenIn: Address,
    tokenOut: Address,
    amountIn: bigint,
    amountOut: bigint,
    type: 'buy' | 'sell',
    expiresAt?: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsCreating(true);
    try {
      const order = createOrder(
        address,
        tokenIn,
        tokenOut,
        amountIn,
        amountOut,
        type,
        expiresAt
      );
      console.log('Creating order:', order);
    } finally {
      setIsCreating(false);
    }
  };

  const matchOrderPair = async (
    buyOrderId: bigint,
    sellOrderId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsMatching(true);
    try {
      const currentTime = BigInt(Date.now());
      const buyOrder = orders.find((o) => o.id === buyOrderId);
      const sellOrder = orders.find((o) => o.id === sellOrderId);
      if (!buyOrder || !sellOrder) throw new Error('Order not found');
      const match = matchOrders(buyOrder, sellOrder, currentTime);
      if (match) {
        console.log('Matching orders:', { buyOrderId, sellOrderId });
      }
    } finally {
      setIsMatching(false);
    }
  };

  return {
    orders,
    createNewOrder,
    matchOrderPair,
    cancelOrder,
    isOrderExpired,
    isCreating,
    isMatching,
    address,
  };
}

