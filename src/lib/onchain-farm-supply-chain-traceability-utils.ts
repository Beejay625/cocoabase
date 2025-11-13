import { type Address } from 'viem';

/**
 * Onchain farm supply chain traceability utilities
 * Supply chain movement tracking and verification
 */

export interface TraceabilityRecord {
  id: string;
  productId: string;
  recordedBy: Address;
  fromLocation: string;
  toLocation: string;
  timestamp: bigint;
  verified: boolean;
}

export function createTraceabilityRecord(
  address: Address,
  productId: string,
  fromLocation: string,
  toLocation: string,
  timestamp: bigint
): TraceabilityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    productId,
    recordedBy: address,
    fromLocation,
    toLocation,
    timestamp,
    verified: false,
  };
}

