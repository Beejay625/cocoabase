import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTrainingRecord,
  type TrainingRecord,
} from '@/lib/onchain-farm-labor-training-utils';

/**
 * Hook for onchain farm labor training
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLaborTraining() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<TrainingRecord[]>([]);

  const recordTraining = async (
    worker: Address,
    trainingType: string,
    trainingDate: bigint,
    certification: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createTrainingRecord(address, worker, trainingType, trainingDate, certification);
    setRecords([...records, record]);
  };

  const verifyTraining = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyTraining',
      args: [recordId],
    });
  };

  return { records, recordTraining, verifyTraining, address };
}

