import { type Address } from 'viem';

/**
 * Onchain farm harvest scheduling utilities
 * Harvest schedule management
 */

export interface HarvestSchedule {
  id: string;
  plantationId: string;
  createdBy: Address;
  scheduledDate: bigint;
  expectedYield: bigint;
  actualYield?: bigint;
  completed: boolean;
  timestamp: bigint;
}

export function createHarvestSchedule(
  address: Address,
  plantationId: string,
  scheduledDate: bigint,
  expectedYield: bigint
): HarvestSchedule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    createdBy: address,
    scheduledDate,
    expectedYield,
    completed: false,
    timestamp: BigInt(Date.now()),
  };
}

