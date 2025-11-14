import { type Address } from 'viem';

/**
 * Onchain farm harvest scheduling utilities
 * Harvest scheduling system
 */

export interface HarvestSchedule {
  id: string;
  scheduleId: bigint;
  farmer: Address;
  cropId: bigint;
  cropType: string;
  scheduledDate: bigint;
  estimatedYield: bigint;
  location: string;
  isCompleted: boolean;
  isCancelled: boolean;
  actualYield: bigint;
  completionDate: bigint;
}

export function createHarvestSchedule(
  address: Address,
  cropId: bigint,
  cropType: string,
  scheduledDate: bigint,
  estimatedYield: bigint,
  location: string
): HarvestSchedule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    scheduleId: BigInt(0),
    farmer: address,
    cropId,
    cropType,
    scheduledDate,
    estimatedYield,
    location,
    isCompleted: false,
    isCancelled: false,
    actualYield: BigInt(0),
    completionDate: BigInt(0),
  };
}
