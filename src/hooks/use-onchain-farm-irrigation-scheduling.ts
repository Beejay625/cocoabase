import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createIrrigationSchedule,
  type IrrigationSchedule,
} from '@/lib/onchain-farm-irrigation-scheduling-utils';

/**
 * Hook for onchain farm irrigation scheduling
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmIrrigationScheduling() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([]);

  const scheduleIrrigation = async (
    plantationId: string,
    startTime: bigint,
    duration: number,
    waterAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const schedule = createIrrigationSchedule(address, plantationId, startTime, duration, waterAmount);
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

  return { schedules, scheduleIrrigation, executeSchedule, address };
}

