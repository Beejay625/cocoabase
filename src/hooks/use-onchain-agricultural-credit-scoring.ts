import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  calculateCreditScore,
  getGoodCredit,
  getRecentScores,
  calculateAverageScore,
  type CreditScore,
} from '@/lib/onchain-agricultural-credit-scoring-utils';

export function useOnchainAgriculturalCreditScoring() {
  const { address } = useAccount();
  const [scores, setScores] = useState<CreditScore[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = async (
    score: number,
    factors: string[]
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCalculating(true);
    try {
      const creditScore = calculateCreditScore(address, score, factors);
      setScores((prev) => [...prev, creditScore]);
      console.log('Calculating credit score:', creditScore);
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    scores,
    calculate,
    getGoodCredit,
    getRecentScores,
    calculateAverageScore,
    isCalculating,
    address,
  };
}
