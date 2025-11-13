import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPriceRecord,
  type PriceRecord,
} from '@/lib/onchain-farm-market-price-tracking-utils';

/**
 * Hook for onchain farm market price tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmMarketPriceTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<PriceRecord[]>([]);

  const recordPrice = async (
    commodity: string,
    price: bigint,
    market: string,
    date: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createPriceRecord(address, commodity, price, market, date);
    setRecords([...records, record]);
  };

  const updatePrice = async (
    contractAddress: Address,
    recordId: string,
    newPrice: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updatePrice',
      args: [recordId, newPrice],
    });
  };

  return { records, recordPrice, updatePrice, address };
}

