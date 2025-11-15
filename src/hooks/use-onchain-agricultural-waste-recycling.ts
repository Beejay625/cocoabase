import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createWasteRecord,
  getRecycledWaste,
  calculateTotalWaste,
  calculateRecyclingRate,
  type WasteRecord,
} from '@/lib/onchain-agricultural-waste-recycling-utils';

export function useOnchainAgriculturalWasteRecycling() {
  const { address } = useAccount();
  const [records, setRecords] = useState<WasteRecord[]>([]);

  const record = (wasteType: string, amount: bigint, recycled: boolean) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const wasteRecord = createWasteRecord(address, wasteType, amount, recycled);
    setRecords((prev) => [...prev, wasteRecord]);
    console.log('Recording waste:', { wasteType, amount, recycled });
  };

  return {
    records,
    record,
    getRecycledWaste,
    calculateTotalWaste,
    calculateRecyclingRate,
    address,
  };
}



