import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  recordQualityAssurance,
  type QualityAssurance,
} from '@/lib/onchain-harvest-quality-assurance-utils';

export function useOnchainHarvestQualityAssurance() {
  const { address } = useAccount();
  const [records, setRecords] = useState<QualityAssurance[]>([]);

  const record = async (
    plantationId: bigint,
    harvestId: bigint,
    qualityScore: number,
    inspector: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const qa = recordQualityAssurance(address, plantationId, harvestId, qualityScore, inspector);
    setRecords([...records, qa]);
  };

  return { records, record, address };
}
