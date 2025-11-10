import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createYieldPrediction,
  resolveYieldPrediction,
  calculatePredictionAccuracy,
  calculatePredictionReward,
  isPredictionExpired,
  type YieldPrediction,
} from '@/lib/onchain-harvest-yield-prediction-market-utils';

/**
 * Hook for onchain harvest yield prediction market operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainHarvestYieldPredictionMarket() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [predictions, setPredictions] = useState<YieldPrediction[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);

  const createPrediction = async (
    plantationId: string,
    predictedYield: bigint,
    confidence: number,
    harvestDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsPredicting(true);
    try {
      const prediction = createYieldPrediction(
        address,
        plantationId,
        predictedYield,
        confidence,
        harvestDate
      );
      setPredictions((prev) => [...prev, prediction]);
      console.log('Creating yield prediction:', prediction);
      // Onchain prediction via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createYieldPrediction',
        args: [plantationId, predictedYield, confidence, harvestDate],
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const resolvePrediction = async (
    predictionId: bigint,
    actualYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    try {
      const prediction = predictions.find((p) => p.id === predictionId);
      if (!prediction) throw new Error('Prediction not found');
      const resolved = resolveYieldPrediction(prediction, actualYield);
      setPredictions((prev) =>
        prev.map((p) => (p.id === predictionId ? resolved : p))
      );
      console.log('Resolving yield prediction:', { predictionId, actualYield });
      // Onchain resolution via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'resolveYieldPrediction',
        args: [predictionId, actualYield],
      });
    } finally {
      // Resolution complete
    }
  };

  return {
    predictions,
    createPrediction,
    resolvePrediction,
    calculatePredictionAccuracy,
    calculatePredictionReward,
    isPredictionExpired,
    isPredicting,
    address,
  };
}

