import { type Address } from 'viem';

export interface SlaughterRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  slaughterDate: bigint;
  method: string;
  recorder: Address;
  certified: boolean;
}

export function createSlaughterRecord(
  address: Address,
  livestockId: bigint,
  method: string
): SlaughterRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    slaughterDate: BigInt(Date.now()),
    method,
    recorder: address,
    certified: false,
  };
}
