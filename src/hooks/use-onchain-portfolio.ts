import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createPortfolio,
  addAsset,
  calculatePortfolioValue,
  type Portfolio,
  type PortfolioAsset,
} from '@/lib/onchain-portfolio-utils';

export function useOnchainPortfolio() {
  const { address } = useAccount();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const initializePortfolio = () => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const newPortfolio = createPortfolio(address);
    setPortfolio(newPortfolio);
    console.log('Initializing portfolio:', newPortfolio);
  };

  const addPortfolioAsset = (
    token: Address,
    amount: bigint,
    price: bigint
  ) => {
    if (!portfolio) throw new Error('Portfolio not initialized');
    const updated = addAsset(portfolio, token, amount, price);
    setPortfolio(updated);
    console.log('Adding asset:', { token, amount, price });
  };

  return {
    portfolio,
    initializePortfolio,
    addPortfolioAsset,
    calculatePortfolioValue,
    address,
  };
}

