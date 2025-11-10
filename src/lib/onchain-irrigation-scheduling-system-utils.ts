import { type Address } from 'viem';

export interface IrrigationSchedule {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  scheduledDate: bigint;
  waterAmount: bigint;
  status: 'scheduled' | 'completed' | 'cancelled';
  txHash: string;
}

export function scheduleIrrigation(
  owner: Address,
  plantationId: bigint,
  scheduledDate: bigint,
  waterAmount: bigint
): IrrigationSchedule {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    scheduledDate,
    waterAmount,
    status: 'scheduled',
    txHash: '',
  };
}
