import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain verification utilities
 * Blockchain verification creation
 */

export interface BlockchainVerification {
  id: string;
  harvestId: string;
  verifiedBy: Address;
  verificationHash: string;
  verificationDate: bigint;
  verifier: string;
  confirmed: boolean;
  timestamp: bigint;
}

export function createBlockchainVerification(
  address: Address,
  harvestId: string,
  verificationHash: string,
  verificationDate: bigint,
  verifier: string
): BlockchainVerification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    verifiedBy: address,
    verificationHash,
    verificationDate,
    verifier,
    confirmed: false,
    timestamp: BigInt(Date.now()),
  };
}

