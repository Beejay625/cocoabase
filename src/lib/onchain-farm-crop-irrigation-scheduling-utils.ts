import { type Address } from 'viem';

export interface IrrigationSchedule {
  id: string;
  plantationId: bigint;
  cropType: string;
  waterAmount: bigint;
  frequency: bigint;
  startDate: bigint;
  endDate: bigint;
  owner: Address;
  active: boolean;
}

export function createIrrigationSchedule(
  address: Address,
  plantationId: bigint,
  cropType: string,
  waterAmount: bigint,
  frequency: bigint,
  startDate: bigint,
  endDate: bigint
): IrrigationSchedule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    waterAmount,
    frequency,
    startDate,
    endDate,
    owner: address,
    active: true,
  };
}


