import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createBiodiversityRecord,
  type BiodiversityRecord,
} from '@/lib/onchain-farm-biodiversity-tracking-utils';

export function useOnchainFarmBiodiversityTracking() {
  const { address } = useAccount();
  const [records, setRecords] = useState<BiodiversityRecord[]>([]);

  const create = async (
    species: string,
    count: bigint,
    location: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createBiodiversityRecord(address, species, count, location);
    setRecords([...records, record]);
  };

  return { records, create, address };
}