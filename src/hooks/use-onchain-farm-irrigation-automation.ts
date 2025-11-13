import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createIrrigationSchedule,
  type IrrigationSchedule,
} from '@/lib/onchain-farm-irrigation-automation-utils';

/**
 * Hook for onchain farm irrigation automation
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmIrrigationAutomation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([]);

  const scheduleIrrigation = async (
    plantationId: string,
    duration: number,
    frequency: number,
    waterAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const schedule = createIrrigationSchedule(address, plantationId, duration, frequency, waterAmount);
    setSchedules([...schedules, schedule]);
  };

  const executeIrrigation = async (
    contractAddress: Address,
    scheduleId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'executeIrrigation',
      args: [scheduleId],
    });
  };

  return { schedules, scheduleIrrigation, executeIrrigation, address };
}

