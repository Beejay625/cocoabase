import { type Address } from 'viem';

export interface PollinationRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  pollinatorType: string;
  pollinationDate: bigint;
  recorder: Address;
  natural: boolean;
}

export function createPollinationRecord(
  address: Address,
  plantationId: bigint,
  pollinatorType: string,
  natural: boolean
): PollinationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    pollinatorType,
    pollinationDate: BigInt(Date.now()),
    recorder: address,
    natural,
  };
}
