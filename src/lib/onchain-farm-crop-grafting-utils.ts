import { type Address } from 'viem';

export interface GraftingRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  rootstockType: string;
  scionType: string;
  graftsPerformed: bigint;
  graftingDate: bigint;
  grafter: Address;
}

export function createGraftingRecord(
  address: Address,
  plantationId: bigint,
  rootstockType: string,
  scionType: string,
  graftsPerformed: bigint
): GraftingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    rootstockType,
    scionType,
    graftsPerformed,
    graftingDate: BigInt(Date.now()),
    grafter: address,
  };
}
