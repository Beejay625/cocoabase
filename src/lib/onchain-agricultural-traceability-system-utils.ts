import { type Address } from 'viem';

export interface TraceabilityRecord {
  id: bigint;
  recorder: Address;
  product: string;
  origin: Address;
  destination: Address;
  timestamp: bigint;
}

export function createTraceabilityRecord(
  recorder: Address,
  product: string,
  origin: Address,
  destination: Address
): TraceabilityRecord {
  return {
    id: BigInt(0),
    recorder,
    product,
    origin,
    destination,
    timestamp: BigInt(Date.now()),
  };
}

export function getProductHistory(
  records: TraceabilityRecord[],
  product: string
): TraceabilityRecord[] {
  return records.filter((r) => r.product === product);
}

export function verifyOrigin(
  records: TraceabilityRecord[],
  product: string,
  origin: Address
): boolean {
  const productRecords = getProductHistory(records, product);
  return productRecords.length > 0 && productRecords[0].origin === origin;
}

