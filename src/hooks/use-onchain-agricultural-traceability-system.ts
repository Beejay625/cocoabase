import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createTraceabilityRecord,
  type TraceabilityRecord,
} from '@/lib/onchain-agricultural-traceability-system-utils';

export function useOnchainAgriculturalTraceabilitySystem() {
  const { address } = useAccount();
  const [records, setRecords] = useState<TraceabilityRecord[]>([]);

  const create = async (
    productId: bigint,
    location: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createTraceabilityRecord(address, productId, location);
    setRecords([...records, record]);
  };

  return { records, create, address };
}