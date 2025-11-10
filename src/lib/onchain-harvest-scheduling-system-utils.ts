import { type Address } from 'viem';

export interface HarvestSchedule {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  scheduledDate: bigint;
  estimatedYield: bigint;
  status: 'scheduled' | 'completed' | 'cancelled';
  txHash: string;
}

export function scheduleHarvest(
  owner: Address,
  plantationId: bigint,
  scheduledDate: bigint,
  estimatedYield: bigint
): HarvestSchedule {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    scheduledDate,
    estimatedYield,
    status: 'scheduled',
    txHash: '',
  };
}

export function completeHarvest(
  schedule: HarvestSchedule
): HarvestSchedule {
  return {
    ...schedule,
    status: 'completed',
  };
}

export function getUpcomingHarvests(
  schedules: HarvestSchedule[],
  currentTime: bigint
): HarvestSchedule[] {
  return schedules
    .filter((s) => s.status === 'scheduled' && s.scheduledDate >= currentTime)
    .sort((a, b) => (a.scheduledDate > b.scheduledDate ? 1 : -1));
}
