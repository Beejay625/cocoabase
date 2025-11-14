import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain nonce utilities
 * Nonce record creation on blockchain
 */

export interface NonceRecord {
  id: string;
  harvestId: string;
  createdBy: Address;
  nonceValue: bigint;
  nonceDate: bigint;
  purpose: string;
  used: boolean;
  timestamp: bigint;
}

export function createNonceRecord(
  address: Address,
  harvestId: string,
  nonceValue: bigint,
  nonceDate: bigint,
  purpose: string
): NonceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    nonceValue,
    nonceDate,
    purpose,
    used: false,
    timestamp: BigInt(Date.now()),
  };
}

