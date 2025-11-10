import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type Order,
} from '@/lib/onchain-matching-utils';

export function useOnchainMatching() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = async (
    tokenIn: Address,
    tokenOut: Address,
    amountIn: bigint,
    amountOut: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'createOrder',
      args: [tokenIn, tokenOut, amountIn, amountOut],
    });
  };

  return { orders, createOrder, address };
}
