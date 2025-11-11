import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordInvestment,
  type Investment,
} from '@/lib/onchain-farm-investment-tracking-utils';

export function useOnchainFarmInvestmentTracking() {
  const { address } = useAccount();
  const [investments, setInvestments] = useState<Investment[]>([]);

  const record = async (
    investmentType: string,
    amount: bigint,
    expectedReturn: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const investment = recordInvestment(address, investmentType, amount, expectedReturn);
    setInvestments([...investments, investment]);
  };

  return { investments, record, address };
}
