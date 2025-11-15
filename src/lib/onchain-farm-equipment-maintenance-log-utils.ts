import { type Address } from 'viem';

/**
 * Onchain Farm Equipment Maintenance Log utilities
 * Track equipment maintenance onchain with Reown wallet integration
 */

export interface MaintenanceLog {
  id: bigint;
  farmer: Address;
  equipmentId: string;
  maintenanceType: 'routine' | 'repair' | 'inspection' | 'upgrade';
  description: string;
  cost: bigint;
  technician: string;
  maintenanceDate: bigint;
  nextMaintenance: bigint;
  status: 'scheduled' | 'completed' | 'overdue';
}

export function createMaintenanceLog(
  farmer: Address,
  equipmentId: string,
  maintenanceType: MaintenanceLog['maintenanceType'],
  description: string,
  cost: bigint,
  technician: string,
  maintenanceDate: bigint,
  nextMaintenance: bigint
): MaintenanceLog {
  return {
    id: BigInt(0),
    farmer,
    equipmentId,
    maintenanceType,
    description,
    cost,
    technician,
    maintenanceDate,
    nextMaintenance,
    status: 'scheduled',
  };
}

export function completeMaintenance(log: MaintenanceLog): MaintenanceLog {
  return {
    ...log,
    status: 'completed',
  };
}

export function isMaintenanceOverdue(log: MaintenanceLog, currentTime: bigint): boolean {
  return currentTime > log.nextMaintenance && log.status !== 'completed';
}

export function calculateMaintenanceCost(logs: MaintenanceLog[]): bigint {
  return logs.reduce((total, log) => total + log.cost, BigInt(0));
}



