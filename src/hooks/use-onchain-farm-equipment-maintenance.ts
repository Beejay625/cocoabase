import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMaintenanceRecord,
  type MaintenanceRecord,
} from '@/lib/onchain-farm-equipment-maintenance-utils';

/**
 * Hook for onchain farm equipment maintenance
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmEquipmentMaintenance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);

  const scheduleMaintenance = async (
    contractAddress: Address,
    equipmentId: bigint,
    equipmentType: string,
    scheduledDate: bigint,
    maintenanceType: string,
    description: string,
    cost: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createMaintenanceRecord(
      address,
      equipmentId,
      equipmentType,
      scheduledDate,
      maintenanceType,
      description,
      cost
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'equipmentId', type: 'uint256' },
            { name: 'equipmentType', type: 'string' },
            { name: 'scheduledDate', type: 'uint256' },
            { name: 'maintenanceType', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'cost', type: 'uint256' }
          ],
          name: 'scheduleMaintenance',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'scheduleMaintenance',
      args: [equipmentId, equipmentType, scheduledDate, maintenanceType, description, cost],
    });
    
    setMaintenanceRecords([...maintenanceRecords, record]);
  };

  const completeMaintenance = async (
    contractAddress: Address,
    recordId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'recordId', type: 'uint256' }],
          name: 'completeMaintenance',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeMaintenance',
      args: [recordId],
    });
  };

  return { 
    maintenanceRecords, 
    scheduleMaintenance, 
    completeMaintenance, 
    address 
  };
}

