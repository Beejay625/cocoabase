import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLaborSchedule,
  type LaborSchedule,
} from '@/lib/onchain-farm-labor-scheduling-utils';

/**
 * Hook for onchain farm labor scheduling
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLaborScheduling() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<LaborSchedule[]>([]);

  const scheduleLabor = async (
    worker: Address,
    task: string,
    startTime: bigint,
    endTime: bigint,
    wage: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const schedule = createLaborSchedule(address, worker, task, startTime, endTime, wage);
    setSchedules([...schedules, schedule]);
  };

  const completeTask = async (
    contractAddress: Address,
    scheduleId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'completeTask',
      args: [scheduleId],
    });
  };

  return { schedules, scheduleLabor, completeTask, address };
}

