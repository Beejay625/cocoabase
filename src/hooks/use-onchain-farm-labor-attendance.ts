import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAttendanceRecord,
  type AttendanceRecord,
} from '@/lib/onchain-farm-labor-attendance-utils';

/**
 * Hook for onchain farm labor attendance tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLaborAttendance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const recordAttendance = async (
    worker: Address,
    date: bigint,
    checkInTime: bigint,
    checkOutTime: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createAttendanceRecord(address, worker, date, checkInTime, checkOutTime);
    setRecords([...records, record]);
  };

  const verifyAttendance = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyAttendance',
      args: [recordId],
    });
  };

  return { records, recordAttendance, verifyAttendance, address };
}

