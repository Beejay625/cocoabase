import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain ownership utilities
 * Ownership record creation on blockchain
 */

export interface OwnershipRecord {
  id: string;
  animalId: string;
  transferredBy: Address;
  fromOwner: Address;
  toOwner: Address;
  transferDate: bigint;
  transferType: string;
  verified: boolean;
  timestamp: bigint;
}

export function createOwnershipRecord(
  address: Address,
  animalId: string,
  fromOwner: Address,
  toOwner: Address,
  transferDate: bigint,
  transferType: string
): OwnershipRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    transferredBy: address,
    fromOwner,
    toOwner,
    transferDate,
    transferType,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

