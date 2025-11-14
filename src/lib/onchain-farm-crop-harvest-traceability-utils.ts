import { type Address } from 'viem';

/**
 * Onchain farm crop harvest traceability utilities
 * Traceability link creation on blockchain
 */

export interface TraceabilityLink {
  id: string;
  harvestId: string;
  createdBy: Address;
  previousLocation: string;
  currentLocation: string;
  transferDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createTraceabilityLink(
  address: Address,
  harvestId: string,
  previousLocation: string,
  currentLocation: string,
  transferDate: bigint
): TraceabilityLink {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    previousLocation,
    currentLocation,
    transferDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

