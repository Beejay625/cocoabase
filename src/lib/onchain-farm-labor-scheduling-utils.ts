import { type Address } from 'viem';

/**
 * Onchain farm labor scheduling utilities
 * Labor schedule creation and task completion
 */

export interface LaborSchedule {
  id: string;
  employer: Address;
  worker: Address;
  task: string;
  startTime: bigint;
  endTime: bigint;
  wage: bigint;
  completed: boolean;
  timestamp: bigint;
}

export function createLaborSchedule(
  employer: Address,
  worker: Address,
  task: string,
  startTime: bigint,
  endTime: bigint,
  wage: bigint
): LaborSchedule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    employer,
    worker,
    task,
    startTime,
    endTime,
    wage,
    completed: false,
    timestamp: BigInt(Date.now()),
  };
}

