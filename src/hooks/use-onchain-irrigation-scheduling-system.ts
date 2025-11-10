import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  scheduleIrrigation,
  type IrrigationSchedule,
} from '@/lib/onchain-irrigation-scheduling-system-utils';

export function useOnchainIrrigationSchedulingSystem() {
  const { address } = useAccount();
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([]);

  const schedule = async (
    plantationId: bigint,
    scheduledDate: bigint,
    waterAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const irrigation = scheduleIrrigation(address, plantationId, scheduledDate, waterAmount);
    setSchedules([...schedules, irrigation]);
  };

  return { schedules, schedule, address };
}
