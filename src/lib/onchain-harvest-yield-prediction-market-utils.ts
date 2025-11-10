import { type Address } from 'viem';

/**
 * Onchain Harvest Yield Prediction Market utilities
 * Predict harvest yields onchain
 */

export interface YieldPrediction {
  id: bigint;
  predictor: Address;
  plantationId: string;
  predictedYield: bigint;
  confidence: number;
  predictionDate: bigint;
  harvestDate: bigint;
  actualYield?: bigint;
  status: 'active' | 'resolved' | 'expired';
}

export function createYieldPrediction(
  predictor: Address,
  plantationId: string,
  predictedYield: bigint,
  confidence: number,
  harvestDate: bigint
): YieldPrediction {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    predictor,
    plantationId,
    predictedYield,
    confidence,
    predictionDate: now,
    harvestDate,
    status: 'active',
  };
}

export function resolveYieldPrediction(
  prediction: YieldPrediction,
  actualYield: bigint
): YieldPrediction {
  const now = BigInt(Date.now());
  return {
    ...prediction,
    actualYield,
    status: 'resolved',
  };
}

export function calculatePredictionAccuracy(prediction: YieldPrediction): number {
  if (!prediction.actualYield || prediction.status !== 'resolved') return 0;
  const difference = Number(prediction.actualYield - prediction.predictedYield);
  const accuracy = 100 - Math.abs((difference / Number(prediction.predictedYield)) * 100);
  return Math.max(0, accuracy);
}

export function calculatePredictionReward(
  prediction: YieldPrediction,
  baseReward: bigint
): bigint {
  if (!prediction.actualYield || prediction.status !== 'resolved') return BigInt(0);
  const accuracy = calculatePredictionAccuracy(prediction);
  const confidenceMultiplier = BigInt(Math.floor(prediction.confidence));
  return (baseReward * BigInt(Math.floor(accuracy)) * confidenceMultiplier) / BigInt(10000);
}

export function isPredictionExpired(
  prediction: YieldPrediction,
  currentTime: bigint
): boolean {
  return currentTime > prediction.harvestDate && prediction.status === 'active';
}

