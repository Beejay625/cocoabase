import { type Address } from 'viem';

/**
 * Onchain farm crop harvest origin verification utilities
 * Origin verification creation on blockchain
 */

export interface OriginVerification {
  id: string;
  harvestId: string;
  verifiedBy: Address;
  originLocation: string;
  verificationMethod: string;
  verificationDate: bigint;
  confirmed: boolean;
  timestamp: bigint;
}

export function createOriginVerification(
  address: Address,
  harvestId: string,
  originLocation: string,
  verificationMethod: string,
  verificationDate: bigint
): OriginVerification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    verifiedBy: address,
    originLocation,
    verificationMethod,
    verificationDate,
    confirmed: false,
    timestamp: BigInt(Date.now()),
  };
}

