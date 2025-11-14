import { type Address } from 'viem';

export interface IdentificationRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  tagNumber: string;
  identificationType: string;
  identificationDate: bigint;
  identifier: Address;
}

export function createIdentificationRecord(
  address: Address,
  livestockId: bigint,
  tagNumber: string,
  identificationType: string
): IdentificationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    tagNumber,
    identificationType,
    identificationDate: BigInt(Date.now()),
    identifier: address,
  };
}
