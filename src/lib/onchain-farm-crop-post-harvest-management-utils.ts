import { type Address } from 'viem';

export interface PostHarvestRecord {
  id: string;
  harvestId: bigint;
  handlingMethod: string;
  storageDuration: bigint;
  qualityMaintained: bigint;
  handler: Address;
}

export function createPostHarvestRecord(
  address: Address,
  harvestId: bigint,
  handlingMethod: string,
  storageDuration: bigint,
  qualityMaintained: bigint
): PostHarvestRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    handlingMethod,
    storageDuration,
    qualityMaintained,
    handler: address,
  };
}


