import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain notarization utilities
 * Notarization creation on blockchain
 */

export interface Notarization {
  id: string;
  harvestId: string;
  notarizedBy: Address;
  documentHash: string;
  notary: string;
  notarizationDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createNotarization(
  address: Address,
  harvestId: string,
  documentHash: string,
  notary: string,
  notarizationDate: bigint
): Notarization {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    notarizedBy: address,
    documentHash,
    notary,
    notarizationDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

