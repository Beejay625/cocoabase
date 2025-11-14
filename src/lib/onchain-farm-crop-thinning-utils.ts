import { type Address } from 'viem';

export interface ThinningRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  plantsThinned: bigint;
  thinningDate: bigint;
  thinner: Address;
  reason: string;
}

export function createThinningRecord(
  address: Address,
  plantationId: bigint,
  plantsThinned: bigint,
  reason: string
): ThinningRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    plantsThinned,
    thinningDate: BigInt(Date.now()),
    thinner: address,
    reason,
  };
}
