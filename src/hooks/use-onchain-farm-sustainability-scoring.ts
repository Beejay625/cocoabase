import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordSustainabilityScore,
  type SustainabilityScore,
} from '@/lib/onchain-farm-sustainability-scoring-utils';

export function useOnchainFarmSustainabilityScoring() {
  const { address } = useAccount();
  const [scores, setScores] = useState<SustainabilityScore[]>([]);

  const record = async (
    plantationId: bigint,
    score: number,
    category: SustainabilityScore['category']
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const sustainability = recordSustainabilityScore(address, plantationId, score, category);
    setScores([...scores, sustainability]);
  };

  return { scores, record, address };
}
