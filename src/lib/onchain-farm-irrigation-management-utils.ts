import { type Address } from 'viem';

export interface IrrigationSchedule {
  id: string;
  scheduleId: bigint;
  plantationId: bigint;
  waterAmount: bigint;
  frequency: bigint;
  nextIrrigation: bigint;
  manager: Address;
  active: boolean;
}

export function createIrrigationSchedule(
  address: Address,
  plantationId: bigint,
  waterAmount: bigint,
  frequency: bigint
): IrrigationSchedule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    scheduleId: BigInt(0),
    plantationId,
    waterAmount,
    frequency,
    nextIrrigation: BigInt(Date.now()) + frequency,
    manager: address,
    active: true,
  };
}

