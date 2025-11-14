import { type Address } from 'viem';

export interface WeedingRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  areaWeeded: bigint;
  weedingDate: bigint;
  method: string;
  weeder: Address;
}

export function createWeedingRecord(
  address: Address,
  plantationId: bigint,
  areaWeeded: bigint,
  method: string
): WeedingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    areaWeeded,
    weedingDate: BigInt(Date.now()),
    method,
    weeder: address,
  };
}

