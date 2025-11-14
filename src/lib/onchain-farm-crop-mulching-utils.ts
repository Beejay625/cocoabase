import { type Address } from 'viem';

export interface MulchingRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  mulchType: string;
  areaMulched: bigint;
  mulchingDate: bigint;
  mulcher: Address;
}

export function createMulchingRecord(
  address: Address,
  plantationId: bigint,
  mulchType: string,
  areaMulched: bigint
): MulchingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    mulchType,
    areaMulched,
    mulchingDate: BigInt(Date.now()),
    mulcher: address,
  };
}
