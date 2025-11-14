import { type Address } from 'viem';

export interface EnhancementActivity {
  id: string;
  plantationId: bigint;
  activityType: string;
  speciesAdded: string;
  implementer: Address;
}

export function createEnhancementActivity(
  address: Address,
  plantationId: bigint,
  activityType: string,
  speciesAdded: string
): EnhancementActivity {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    activityType,
    speciesAdded,
    implementer: address,
  };
}

