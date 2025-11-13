import { type Address } from 'viem';

/**
 * Onchain farm crop fertilizer schedule utilities
 * Fertilizer schedule creation and execution
 */

export interface FertilizerSchedule {
  id: string;
  plantationId: string;
  createdBy: Address;
  fertilizerType: string;
  applicationDate: bigint;
  amount: bigint;
  frequency: number;
  executed: boolean;
  timestamp: bigint;
}

export function createFertilizerSchedule(
  address: Address,
  plantationId: string,
  fertilizerType: string,
  applicationDate: bigint,
  amount: bigint,
  frequency: number
): FertilizerSchedule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    createdBy: address,
    fertilizerType,
    applicationDate,
    amount,
    frequency,
    executed: false,
    timestamp: BigInt(Date.now()),
  };
}

