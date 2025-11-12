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
