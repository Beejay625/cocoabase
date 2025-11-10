import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createTradeFinance,
  type TradeFinance,
} from '@/lib/onchain-trade-finance-utils';

export function useOnchainTradeFinance() {
  const { address } = useAccount();
  const [finances, setFinances] = useState<TradeFinance[]>([]);

  const createFinance = async (
    lender: Address,
    amount: bigint,
    interestRate: bigint,
    term: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const finance = createTradeFinance(address, lender, amount, interestRate, term);
    setFinances([...finances, finance]);
  };

  return { finances, createFinance, address };
}
