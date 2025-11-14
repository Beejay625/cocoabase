import { type Address } from 'viem';

export interface QuarantineRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  startDate: bigint;
  endDate: bigint;
  reason: string;
  recorder: Address;
  released: boolean;
}

export function createQuarantineRecord(
  address: Address,
  livestockId: bigint,
  duration: bigint,
  reason: string
): QuarantineRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    startDate: BigInt(Date.now()),
    endDate: BigInt(Date.now()) + duration,
    reason,
    recorder: address,
    released: false,
  };
}
