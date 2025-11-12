import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordUtilization,
  type UtilizationRecord,
} from '@/lib/onchain-farm-equipment-utilization-tracking-utils';

export function useOnchainFarmEquipmentUtilizationTracking() {
  const { address } = useAccount();
  const [records, setRecords] = useState<UtilizationRecord[]>([]);

  const record = async (
    equipmentId: bigint,
    hoursUsed: number,
    utilizationRate: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const record = recordUtilization(address, equipmentId, hoursUsed, utilizationRate);
    setRecords([...records, record]);
  };

  return { records, record, address };
}
