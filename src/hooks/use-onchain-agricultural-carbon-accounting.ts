import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createCarbonRecord,
  calculateNetEmissions,
  calculateTotalEmissions,
  calculateTotalOffset,
  type CarbonRecord,
} from '@/lib/onchain-agricultural-carbon-accounting-utils';

export function useOnchainAgriculturalCarbonAccounting() {
  const { address } = useAccount();
  const [records, setRecords] = useState<CarbonRecord[]>([]);

  const record = (activity: string, emissions: bigint, offset: bigint) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const carbonRecord = createCarbonRecord(address, activity, emissions, offset);
    setRecords((prev) => [...prev, carbonRecord]);
    console.log('Recording carbon:', { activity, emissions, offset });
  };

  return {
    records,
    record,
    calculateNetEmissions,
    calculateTotalEmissions,
    calculateTotalOffset,
    address,
  };
}

