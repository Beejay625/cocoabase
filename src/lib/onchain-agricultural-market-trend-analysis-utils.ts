import { type Address } from 'viem';

export interface TrendAnalysis {
  id: bigint;
  analyst: Address;
  commodity: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  analysisDate: bigint;
  txHash: string;
}

export function createTrendAnalysis(
  analyst: Address,
  commodity: string,
  trend: 'bullish' | 'bearish' | 'neutral',
  confidence: number
): TrendAnalysis {
  return {
    id: BigInt(Date.now()),
    analyst,
    commodity,
    trend,
    confidence,
    analysisDate: BigInt(Date.now()),
    txHash: '',
  };
}
