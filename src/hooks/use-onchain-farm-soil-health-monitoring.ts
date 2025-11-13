import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createSoilHealthRecord,
  type SoilHealthRecord,
} from '@/lib/onchain-farm-soil-health-monitoring-utils';

export function useOnchainFarmSoilHealthMonitoring() {
  const { address } = useAccount();
  const [records, setRecords] = useState<SoilHealthRecord[]>([]);

  const create = async (
    location: string,
    phLevel: number,
    organicMatter: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createSoilHealthRecord(address, location, phLevel, organicMatter);
    setRecords([...records, record]);
  };

  return { records, create, address };
}