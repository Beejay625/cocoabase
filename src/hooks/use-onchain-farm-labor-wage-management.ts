import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWageRecord,
  type WageRecord,
} from '@/lib/onchain-farm-labor-wage-management-utils';

/**
 * Hook for onchain farm labor wage management
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLaborWageManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<WageRecord[]>([]);

  const recordWage = async (
    worker: Address,
    amount: bigint,
    period: string,
    paymentDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createWageRecord(address, worker, amount, period, paymentDate);
    setRecords([...records, record]);
  };

  const processPayment = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'processPayment',
      args: [recordId],
    });
  };

  return { records, recordWage, processPayment, address };
}

