import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  scheduleMaintenance,
  type MaintenanceSchedule,
} from '@/lib/onchain-equipment-maintenance-scheduling-utils';

export function useOnchainEquipmentMaintenanceScheduling() {
  const { address } = useAccount();
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);

  const schedule = async (
    equipmentId: bigint,
    maintenanceType: string,
    scheduledDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const maintenance = scheduleMaintenance(address, equipmentId, maintenanceType, scheduledDate);
    setSchedules([...schedules, maintenance]);
  };

  return { schedules, schedule, address };
}
