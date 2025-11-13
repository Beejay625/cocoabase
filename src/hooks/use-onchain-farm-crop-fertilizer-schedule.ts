import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFertilizerSchedule,
  type FertilizerSchedule,
} from '@/lib/onchain-farm-crop-fertilizer-schedule-utils';

/**
 * Hook for onchain farm crop fertilizer scheduling
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropFertilizerSchedule() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<FertilizerSchedule[]>([]);

  const createSchedule = async (
    plantationId: string,
    fertilizerType: string,
    applicationDate: bigint,
    amount: bigint,
    frequency: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const schedule = createFertilizerSchedule(address, plantationId, fertilizerType, applicationDate, amount, frequency);
    setSchedules([...schedules, schedule]);
  };

  const executeSchedule = async (
    contractAddress: Address,
    scheduleId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'executeSchedule',
      args: [scheduleId],
    });
  };

  return { schedules, createSchedule, executeSchedule, address };
}

