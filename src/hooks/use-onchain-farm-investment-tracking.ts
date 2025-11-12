import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createInvestment,
  getActiveInvestments,
  calculateTotalInvestment,
  calculateExpectedReturn,
  type Investment,
} from '@/lib/onchain-farm-investment-tracking-utils';

export function useOnchainFarmInvestmentTracking() {
  const { address } = useAccount();
  const [investments, setInvestments] = useState<Investment[]>([]);

  const record = (
    investmentType: string,
    amount: bigint,
    expectedReturn: bigint
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const investment = createInvestment(address, investmentType, amount, expectedReturn);
    setInvestments((prev) => [...prev, investment]);
    console.log('Recording investment:', { investmentType, amount });
  };

  return {
    investments,
    record,
    getActiveInvestments,
    calculateTotalInvestment,
    calculateExpectedReturn,
    address,
  };
}

import type { Address } from 'viem';
import {
  createInvestment,
  getActiveInvestments,
  calculateTotalInvestment,
  calculateTotalExpectedReturn,
  type Investment,
} from '@/lib/onchain-farm-investment-tracking-utils';

export function useOnchainFarmInvestmentTracking() {
  const { address } = useAccount();
  const [investments, setInvestments] = useState<Investment[]>([]);

  const record = (
    investmentType: string,
    amount: bigint,
    expectedReturn: bigint
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const investment = createInvestment(address, investmentType, amount, expectedReturn);
    setInvestments((prev) => [...prev, investment]);
    console.log('Recording investment:', { investmentType, amount });
  };

  return {
    investments,
    record,
    getActiveInvestments,
    calculateTotalInvestment,
    calculateTotalExpectedReturn,
    address,
  };
}
