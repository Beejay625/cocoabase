import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPredictionMarket,
  placePrediction,
  resolveMarket,
  type PredictionMarket,
  type Prediction,
} from '@/lib/onchain-prediction-market-utils';

export function useOnchainPredictionMarket() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [markets, setMarkets] = useState<PredictionMarket[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);

  const predict = async (
    marketId: bigint,
    outcome: 'A' | 'B',
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsPredicting(true);
    try {
      const market = markets.find((m) => m.id === marketId);
      if (!market) throw new Error('Market not found');
      const { prediction } = placePrediction(market, address, outcome, amount);
      console.log('Placing prediction:', prediction);
    } finally {
      setIsPredicting(false);
    }
  };

  return {
    markets,
    predictions,
    predict,
    resolveMarket,
    isPredicting,
    address,
  };
}

