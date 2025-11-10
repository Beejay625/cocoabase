import { useState, useMemo } from 'react';
import { type Address } from 'viem';
import {
  calculateReputationScore,
  getReputationLevel,
  calculateReputationBoost,
  type ReputationScore,
} from '@/lib/onchain-reputation-utils';

/**
 * Hook for onchain reputation tracking
 */
export function useReputation(address?: Address) {
  const [reputation, setReputation] = useState<ReputationScore | null>(null);

  const updateReputation = (factors: ReputationScore['factors']) => {
    const score = calculateReputationScore(factors);
    const level = getReputationLevel(score);
    setReputation({
      address: address || '0x0',
      score,
      level,
      factors,
    });
  };

  const boostReputation = (achievements: number) => {
    if (!reputation) return;
    const boost = calculateReputationBoost(achievements);
    setReputation({
      ...reputation,
      score: reputation.score + boost,
      level: getReputationLevel(reputation.score + boost),
    });
  };

  return {
    reputation,
    updateReputation,
    boostReputation,
  };
}

