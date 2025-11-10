import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordFertilizer,
  type FertilizerRecord,
} from '@/lib/onchain-fertilizer-tracking-utils';

export function useOnchainFertilizerTracking() {
  const { address } = useAccount();
  const [records, setRecords] = useState<FertilizerRecord[]>([]);

  const recordFertilizerApplication = async (
    plantationId: bigint,
    fertilizerType: string,
    quantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const record = recordFertilizer(address, plantationId, fertilizerType, quantity);
    setRecords([...records, record]);
  };

  return { records, recordFertilizerApplication, address };
}
