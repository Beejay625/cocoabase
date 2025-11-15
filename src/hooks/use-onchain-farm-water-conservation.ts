import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createWaterConservationRecord,
  getRecordsByMethod,
  calculateTotalSaved,
  getRecentConservation,
  type WaterConservationRecord,
} from '@/lib/onchain-farm-water-conservation-utils';

export function useOnchainFarmWaterConservation() {
  const { address } = useAccount();
  const [records, setRecords] = useState<WaterConservationRecord[]>([]);

  const record = (method: string, savedAmount: bigint) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const waterRecord = createWaterConservationRecord(address, method, savedAmount);
    setRecords((prev) => [...prev, waterRecord]);
    console.log('Recording water conservation:', { method, savedAmount });
  };

  return {
    records,
    record,
    getRecordsByMethod,
    calculateTotalSaved,
    getRecentConservation,
    address,
  };
}



