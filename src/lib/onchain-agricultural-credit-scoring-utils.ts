import { type Address } from 'viem';

export interface CreditScore {
  id: bigint;
  owner: Address;
  score: number;
  factors: string;
  assessmentDate: bigint;
  status: 'good' | 'fair' | 'poor';
  txHash: string;
}

export function calculateCreditScore(
  owner: Address,
  score: number,
  factors: string
): CreditScore {
  const status: CreditScore['status'] = 
    score >= 700 ? 'good' : score >= 600 ? 'fair' : 'poor';
  
  return {
    id: BigInt(Date.now()),
    owner,
    score,
    factors,
    assessmentDate: BigInt(Date.now()),
    status,
    txHash: '',
  };
}

export function getGoodCreditScores(
  scores: CreditScore[]
): CreditScore[] {
  return scores.filter((s) => s.status === 'good');
}

export function getRecentScores(
  scores: CreditScore[],
  days: number
): CreditScore[] {
  const cutoff = BigInt(Date.now() - days * 24 * 60 * 60 * 1000);
  return scores.filter((s) => s.assessmentDate >= cutoff);
}

export function calculateAverageCreditScore(
  scores: CreditScore[]
): number {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, s) => sum + s.score, 0);
  return total / scores.length;
}
