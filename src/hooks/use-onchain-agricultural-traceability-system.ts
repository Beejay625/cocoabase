import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createTraceabilityRecord,
  getProductHistory,
  verifyOrigin,
  type TraceabilityRecord,
} from '@/lib/onchain-agricultural-traceability-system-utils';

export function useOnchainAgriculturalTraceabilitySystem() {
  const { address } = useAccount();
  const [records, setRecords] = useState<TraceabilityRecord[]>([]);

  const record = (product: string, origin: Address, destination: Address) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const traceabilityRecord = createTraceabilityRecord(address, product, origin, destination);
    setRecords((prev) => [...prev, traceabilityRecord]);
    console.log('Recording traceability:', { product, origin, destination });
  };

  return {
    records,
    record,
    getProductHistory,
    verifyOrigin,
    address,
  };
}

