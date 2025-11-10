import { type Address } from 'viem';

/**
 * EIP-712 signature utilities
 * Create and verify typed data signatures
 */

export interface TypedDataDomain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: Address;
}

export interface TypedDataField {
  name: string;
  type: string;
}

export interface SignatureData {
  domain: TypedDataDomain;
  types: Record<string, TypedDataField[]>;
  message: Record<string, unknown>;
}

/**
 * Create EIP-712 domain
 */
export function createTypedDataDomain(
  name: string,
  version: string,
  chainId: number,
  verifyingContract: Address
): TypedDataDomain {
  return { name, version, chainId, verifyingContract };
}

