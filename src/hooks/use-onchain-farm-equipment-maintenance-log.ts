import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMaintenanceLog,
  completeMaintenance,
  isMaintenanceOverdue,
  calculateMaintenanceCost,
  type MaintenanceLog,
} from '@/lib/onchain-farm-equipment-maintenance-log-utils';

/**
 * Hook for onchain farm equipment maintenance log operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainFarmEquipmentMaintenanceLog() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [isLogging, setIsLogging] = useState(false);

  const logMaintenance = async (
    equipmentId: string,
    maintenanceType: MaintenanceLog['maintenanceType'],
    description: string,
    cost: bigint,
    technician: string,
    maintenanceDate: bigint,
    nextMaintenance: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsLogging(true);
    try {
      const log = createMaintenanceLog(
        address,
        equipmentId,
        maintenanceType,
        description,
        cost,
        technician,
        maintenanceDate,
        nextMaintenance
      );
      setLogs((prev) => [...prev, log]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'logMaintenance',
        args: [equipmentId, maintenanceType, description, cost, technician, maintenanceDate, nextMaintenance],
      });
    } finally {
      setIsLogging(false);
    }
  };

  return {
    logs,
    logMaintenance,
    completeMaintenance,
    isMaintenanceOverdue,
    calculateMaintenanceCost,
    isLogging,
    address,
  };
}



