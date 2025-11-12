import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createMaintenanceRecord,
  getMaintenanceByEquipment,
  calculateTotalCost,
  getRecentMaintenance,
  type MaintenanceRecord,
} from '@/lib/onchain-farm-equipment-maintenance-records-utils';

export function useOnchainFarmEquipmentMaintenanceRecords() {
  const { address } = useAccount();
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);

  const record = (
    equipment: string,
    cost: bigint,
    technician: Address
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const maintenanceRecord = createMaintenanceRecord(
      address,
      equipment,
      cost,
      technician
    );
    setRecords((prev) => [...prev, maintenanceRecord]);
    console.log('Recording maintenance:', { equipment, cost });
  };

  return {
    records,
    record,
    getMaintenanceByEquipment,
    calculateTotalCost,
    getRecentMaintenance,
    address,
  };
}

    );
    setRecords((prev) => [...prev, maintenanceRecord]);
    console.log('Recording maintenance:', { equipment, cost });
  };

  return {
    records,
    record,
    getMaintenanceByEquipment,
    calculateTotalCost,
    getRecentMaintenance,
    address,
  };
}
