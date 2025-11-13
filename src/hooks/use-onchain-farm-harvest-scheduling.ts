import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createHarvestSchedule,
  type HarvestSchedule,
} from '@/lib/onchain-farm-harvest-scheduling-utils';

/**
 * Hook for onchain farm harvest scheduling
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmHarvestScheduling() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<HarvestSchedule[]>([]);

  const scheduleHarvest = async (
    plantationId: string,
    scheduledDate: bigint,
    expectedYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const schedule = createHarvestSchedule(address, plantationId, scheduledDate, expectedYield);
    setSchedules([...schedules, schedule]);
  };

  const completeHarvest = async (
    contractAddress: Address,
    scheduleId: string,
    actualYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'completeHarvest',
      args: [scheduleId, actualYield],
    });
  };

  return { schedules, scheduleHarvest, completeHarvest, address };
}

