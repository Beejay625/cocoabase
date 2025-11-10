import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordWaste,
  type WasteRecord,
} from '@/lib/onchain-waste-management-utils';

export function useOnchainWasteManagement() {
  const { address } = useAccount();
  const [records, setRecords] = useState<WasteRecord[]>([]);

  const record = async (
    plantationId: bigint,
    wasteType: WasteRecord['wasteType'],
    quantity: bigint,
    disposalMethod: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const waste = recordWaste(address, plantationId, wasteType, quantity, disposalMethod);
    setRecords([...records, waste]);
  };

  return { records, record, address };
}
