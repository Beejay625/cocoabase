import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSupplyOrder,
  type SupplyOrder,
} from '@/lib/onchain-farm-supply-ordering-utils';

/**
 * Hook for onchain farm supply ordering
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSupplyOrdering() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [orders, setOrders] = useState<SupplyOrder[]>([]);

  const createOrder = async (
    supplier: Address,
    itemName: string,
    quantity: bigint,
    unitPrice: bigint,
    deliveryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const order = createSupplyOrder(address, supplier, itemName, quantity, unitPrice, deliveryDate);
    setOrders([...orders, order]);
  };

  const confirmDelivery = async (
    contractAddress: Address,
    orderId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'confirmDelivery',
      args: [orderId],
    });
  };

  return { orders, createOrder, confirmDelivery, address };
}

