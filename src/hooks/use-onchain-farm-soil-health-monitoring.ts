import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createSoilHealthRecord,
  getHealthySoil,
  calculateAveragePh,
  type SoilHealthRecord,
} from '@/lib/onchain-farm-soil-health-monitoring-utils';

export function useOnchainFarmSoilHealthMonitoring() {
  const { address } = useAccount();
  const [records, setRecords] = useState<SoilHealthRecord[]>([]);

  const record = (ph: number, nutrients: string[], organicMatter: number) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const soilRecord = createSoilHealthRecord(address, ph, nutrients, organicMatter);
    setRecords((prev) => [...prev, soilRecord]);
    console.log('Recording soil health:', { ph, nutrients, organicMatter });
  };

  return {
    records,
    record,
    getHealthySoil,
    calculateAveragePh,
    address,
  };
}

