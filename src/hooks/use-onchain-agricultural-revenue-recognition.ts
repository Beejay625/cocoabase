import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createRevenueRecord,
  recognizeRevenue,
  getPendingRevenue,
  calculateTotalRevenue,
  type RevenueRecord,
} from '@/lib/onchain-agricultural-revenue-recognition-utils';

export function useOnchainAgriculturalRevenueRecognition() {
  const { address } = useAccount();
  const [records, setRecords] = useState<RevenueRecord[]>([]);

  const record = (source: string, amount: bigint, recognitionDate: bigint) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const revenueRecord = createRevenueRecord(address, source, amount, recognitionDate);
    setRecords((prev) => [...prev, revenueRecord]);
    console.log('Recording revenue:', { source, amount });
  };

  return {
    records,
    record,
    recognizeRevenue,
    getPendingRevenue,
    calculateTotalRevenue,
    address,
  };
}
