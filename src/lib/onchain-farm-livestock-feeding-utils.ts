import { type Address } from 'viem';

export interface FeedingRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  feedType: string;
  quantity: bigint;
  feedingDate: bigint;
  feeder: Address;
}

export function createFeedingRecord(
  address: Address,
  livestockId: bigint,
  feedType: string,
  quantity: bigint
): FeedingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    feedType,
    quantity,
    feedingDate: BigInt(Date.now()),
    feeder: address,
  };
}

