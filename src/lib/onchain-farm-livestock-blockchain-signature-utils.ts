import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain signature utilities
 * Signature record creation on blockchain
 */

export interface SignatureRecord {
  id: string;
  animalId: string;
  signedBy: Address;
  signer: Address;
  signature: string;
  message: string;
  signatureDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createSignatureRecord(
  address: Address,
  animalId: string,
  signer: Address,
  signature: string,
  message: string,
  signatureDate: bigint
): SignatureRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    signedBy: address,
    signer,
    signature,
    message,
    signatureDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

