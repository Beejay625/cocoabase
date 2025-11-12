import { type Address } from 'viem';

export interface CreditScore {
  id: bigint;
  borrower: Address;
  score: number;
  factors: string[];
  timestamp: bigint;
}

export function calculateCreditScore(
  borrower: Address,
  score: number,
  factors: string[]
): CreditScore {
  return {
    id: BigInt(0),
    borrower,
    score,
    factors,
    timestamp: BigInt(Date.now()),
  };
}

export function getGoodCredit(
  scores: CreditScore[],
  threshold: number
): CreditScore[] {
  return scores.filter((s) => s.score >= threshold);
}

export function getRecentScores(
  scores: CreditScore[],
  days: number
): CreditScore[] {
  const cutoff = BigInt(Date.now() - days * 24 * 60 * 60 * 1000);
  return scores.filter((s) => s.timestamp >= cutoff);
}

export function calculateAverageScore(scores: CreditScore[]): number {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, s) => sum + s.score, 0);
  return total / scores.length;
}
