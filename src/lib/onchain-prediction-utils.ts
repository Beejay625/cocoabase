import { type Address } from 'viem';

/**
 * Onchain prediction market utilities
 * Yield prediction and market betting
 */

export interface PredictionMarket {
  id: bigint;
  question: string;
  endTime: bigint;
  resolutionTime: bigint;
  outcome: 'yes' | 'no' | 'pending';
  totalYes: bigint;
  totalNo: bigint;
  creator: Address;
}

export interface Prediction {
  id: bigint;
  marketId: bigint;
  user: Address;
  outcome: 'yes' | 'no';
  amount: bigint;
  odds: number;
  createdAt: bigint;
}

export function createPredictionMarket(
  question: string,
  endTime: bigint,
  resolutionTime: bigint,
  creator: Address
): PredictionMarket {
  return {
    id: BigInt(0),
    question,
    endTime,
    resolutionTime,
    outcome: 'pending',
    totalYes: BigInt(0),
    totalNo: BigInt(0),
    creator,
  };
}

export function placePrediction(
  market: PredictionMarket,
  user: Address,
  outcome: 'yes' | 'no',
  amount: bigint
): { market: PredictionMarket; prediction: Prediction } {
  const prediction: Prediction = {
    id: BigInt(0),
    marketId: market.id,
    user,
    outcome,
    amount,
    odds: calculatePredictionOdds(market),
    createdAt: BigInt(Date.now()),
  };
  return {
    market: {
      ...market,
      totalYes: outcome === 'yes' ? market.totalYes + amount : market.totalYes,
      totalNo: outcome === 'no' ? market.totalNo + amount : market.totalNo,
    },
    prediction,
  };
}

export function calculatePredictionOdds(
  market: PredictionMarket
): number {
  const total = market.totalYes + market.totalNo;
  if (total === BigInt(0)) return 50;
  return (Number(market.totalYes) / Number(total)) * 100;
}

export function resolvePredictionMarket(
  market: PredictionMarket,
  outcome: 'yes' | 'no'
): PredictionMarket {
  return {
    ...market,
    outcome,
  };
}

export function calculatePredictionPayout(
  prediction: Prediction,
  market: PredictionMarket,
  outcome: 'yes' | 'no'
): bigint {
  if (market.outcome !== outcome || market.outcome === 'pending') {
    return BigInt(0);
  }
  const totalPool = market.totalYes + market.totalNo;
  if (totalPool === BigInt(0)) return BigInt(0);
  const winningPool = outcome === 'yes' ? market.totalYes : market.totalNo;
  return (prediction.amount * totalPool) / winningPool;
}

export function isMarketResolvable(
  market: PredictionMarket,
  currentTime: bigint
): boolean {
  return currentTime >= market.resolutionTime && market.outcome === 'pending';
}
