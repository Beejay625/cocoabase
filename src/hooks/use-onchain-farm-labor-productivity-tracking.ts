import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  recordProductivity,
  type ProductivityRecord,
} from '@/lib/onchain-farm-labor-productivity-tracking-utils';

export function useOnchainFarmLaborProductivityTracking() {
  const { address } = useAccount();
  const [records, setRecords] = useState<ProductivityRecord[]>([]);

  const record = async (
    workerAddress: Address,
    taskType: string,
    output: bigint,
    hoursWorked: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const record = recordProductivity(address, workerAddress, taskType, output, hoursWorked);
    setRecords([...records, record]);
  };

  return { records, record, address };
}
