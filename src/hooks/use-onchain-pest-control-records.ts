import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordPestControl,
  type PestControlRecord,
} from '@/lib/onchain-pest-control-records-utils';

export function useOnchainPestControlRecords() {
  const { address } = useAccount();
  const [records, setRecords] = useState<PestControlRecord[]>([]);

  const recordTreatment = async (
    plantationId: bigint,
    pestType: string,
    treatment: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const record = recordPestControl(address, plantationId, pestType, treatment);
    setRecords([...records, record]);
  };

  return { records, recordTreatment, address };
}
