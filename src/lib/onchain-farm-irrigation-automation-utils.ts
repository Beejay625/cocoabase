import { type Address } from 'viem';

/**
 * Onchain farm irrigation automation utilities
 * Irrigation scheduling and automation
 */

export interface IrrigationSchedule {
  id: string;
  plantationId: string;
  createdBy: Address;
  duration: number;
  frequency: number;
  waterAmount: bigint;
  active: boolean;
  timestamp: bigint;
}

export function createIrrigationSchedule(
  address: Address,
  plantationId: string,
  duration: number,
  frequency: number,
  waterAmount: bigint
): IrrigationSchedule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    createdBy: address,
    duration,
    frequency,
    waterAmount,
    active: true,
    timestamp: BigInt(Date.now()),
  };
}

