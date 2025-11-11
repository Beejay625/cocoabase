import { type Address } from 'viem';

export interface SignatureVerification {
  id: bigint;
  signer: Address;
  message: string;
  signature: string;
  verified: boolean;
}

export function createSignatureVerification(
  signer: Address,
  message: string,
  signature: string
): SignatureVerification {
  return {
    id: BigInt(0),
    signer,
    message,
    signature,
    verified: false,
  };
}

