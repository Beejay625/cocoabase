import { type Address } from 'viem';

/**
 * Onchain farm crop harvest chain of custody utilities
 * Custody transfer creation on blockchain
 */

export interface CustodyTransfer {
  id: string;
  harvestId: string;
  transferredBy: Address;
  fromParty: Address;
  toParty: Address;
  transferDate: bigint;
  reason: string;
  verified: boolean;
  timestamp: bigint;
}

export function createCustodyTransfer(
  address: Address,
  harvestId: string,
  fromParty: Address,
  toParty: Address,
  transferDate: bigint,
  reason: string
): CustodyTransfer {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    transferredBy: address,
    fromParty,
    toParty,
    transferDate,
    reason,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

