import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain event utilities
 * Event record creation on blockchain
 */

export interface EventRecord {
  id: string;
  harvestId: string;
  emittedBy: Address;
  eventType: string;
  eventData: string;
  eventDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createEventRecord(
  address: Address,
  harvestId: string,
  eventType: string,
  eventData: string,
  eventDate: bigint
): EventRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    emittedBy: address,
    eventType,
    eventData,
    eventDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}



