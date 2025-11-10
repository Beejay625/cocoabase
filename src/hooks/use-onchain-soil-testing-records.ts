import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordSoilTest,
  type SoilTestRecord,
} from '@/lib/onchain-soil-testing-records-utils';

export function useOnchainSoilTestingRecords() {
  const { address } = useAccount();
  const [records, setRecords] = useState<SoilTestRecord[]>([]);

  const recordTest = async (
    plantationId: bigint,
    pH: number,
    nitrogen: number,
    phosphorus: number,
    potassium: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const record = recordSoilTest(address, plantationId, pH, nitrogen, phosphorus, potassium);
    setRecords([...records, record]);
  };

  return { records, recordTest, address };
}
