import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCarbonTrade,
  type CarbonCreditTrade,
} from '@/lib/onchain-farm-carbon-credit-trading-utils';

/**
 * Hook for onchain farm carbon credit trading
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCarbonCreditTrading() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [trades, setTrades] = useState<CarbonCreditTrade[]>([]);

  const createTrade = async (
    creditAmount: bigint,
    pricePerCredit: bigint,
    buyer: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const trade = createCarbonTrade(address, creditAmount, pricePerCredit, buyer);
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

