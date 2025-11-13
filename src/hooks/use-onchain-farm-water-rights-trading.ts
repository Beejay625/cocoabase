import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWaterRightsTrade,
  type WaterRightsTrade,
} from '@/lib/onchain-farm-water-rights-trading-utils';

/**
 * Hook for onchain farm water rights trading
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmWaterRightsTrading() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [trades, setTrades] = useState<WaterRightsTrade[]>([]);

  const createTrade = async (
    waterRightsId: string,
    amount: bigint,
    price: bigint,
    buyer: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const trade = createWaterRightsTrade(address, waterRightsId, amount, price, buyer);
    setTrades([...trades, trade]);
  };

  const executeTrade = async (
    contractAddress: Address,
    tradeId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'executeTrade',
      args: [tradeId],
    });
  };

  return { trades, createTrade, executeTrade, address };
}

