import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recognizeRevenue,
  type RevenueRecord,
} from '@/lib/onchain-agricultural-revenue-recognition-utils';

export function useOnchainAgriculturalRevenueRecognition() {
  const { address } = useAccount();
  const [records, setRecords] = useState<RevenueRecord[]>([]);

  const recognize = async (
    revenueSource: string,
    amount: bigint,
    period: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const record = recognizeRevenue(address, revenueSource, amount, period);
    setRecords([...records, record]);
  };

  return { records, recognize, address };
}
