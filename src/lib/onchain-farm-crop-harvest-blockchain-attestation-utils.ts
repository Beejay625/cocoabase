import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain attestation utilities
 * Attestation creation on blockchain
 */

export interface Attestation {
  id: string;
  harvestId: string;
  attestedBy: Address;
  attester: Address;
  statement: string;
  attestationDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createAttestation(
  address: Address,
  harvestId: string,
  attester: Address,
  statement: string,
  attestationDate: bigint
): Attestation {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    attestedBy: address,
    attester,
    statement,
    attestationDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

