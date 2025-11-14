import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain delegation utilities
 * Delegation creation on blockchain
 */

export interface Delegation {
  id: string;
  animalId: string;
  delegatedBy: Address;
  fromAddress: Address;
  toAddress: Address;
  delegationDate: bigint;
  permissions: string[];
  revoked: boolean;
  timestamp: bigint;
}

export function createDelegation(
  address: Address,
  animalId: string,
  fromAddress: Address,
  toAddress: Address,
  delegationDate: bigint,
  permissions: string[]
): Delegation {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    delegatedBy: address,
    fromAddress,
    toAddress,
    delegationDate,
    permissions,
    revoked: false,
    timestamp: BigInt(Date.now()),
  };
}

