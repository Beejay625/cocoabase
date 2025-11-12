import { type Address } from 'viem';

export interface SustainabilityScore {
  id: bigint;
  recorder: Address;
  category: 'environmental' | 'social' | 'economic' | 'overall';
  score: number;
  timestamp: bigint;
}

export function createSustainabilityScore(
  recorder: Address,
  category: 'environmental' | 'social' | 'economic' | 'overall',
  score: number
): SustainabilityScore {
  return {
    id: BigInt(0),
    recorder,
    category,
    score,
    timestamp: BigInt(Date.now()),
  };
}

export function getScoresByCategory(
  scores: SustainabilityScore[],
  category: 'environmental' | 'social' | 'economic' | 'overall'
): SustainabilityScore[] {
  return scores.filter((s) => s.category === category);
}

export function calculateAverageScore(scores: SustainabilityScore[]): number {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, s) => sum + s.score, 0);
  return total / scores.length;
}

export function getHighScores(
  scores: SustainabilityScore[],
  minimum: number
): SustainabilityScore[] {
  return scores.filter((s) => s.score >= minimum);
}
