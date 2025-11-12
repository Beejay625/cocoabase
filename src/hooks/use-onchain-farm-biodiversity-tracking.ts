import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createBiodiversityRecord,
  getSpeciesByHabitat,
  calculateTotalSpecies,
  getUniqueSpecies,
  type BiodiversityRecord,
} from '@/lib/onchain-farm-biodiversity-tracking-utils';

export function useOnchainFarmBiodiversityTracking() {
  const { address } = useAccount();
  const [records, setRecords] = useState<BiodiversityRecord[]>([]);

  const record = (species: string, count: bigint, habitat: string) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const biodiversityRecord = createBiodiversityRecord(address, species, count, habitat);
    setRecords((prev) => [...prev, biodiversityRecord]);
    console.log('Recording biodiversity:', { species, count, habitat });
  };

  return {
    records,
    record,
    getSpeciesByHabitat,
    calculateTotalSpecies,
    getUniqueSpecies,
    address,
  };
}

