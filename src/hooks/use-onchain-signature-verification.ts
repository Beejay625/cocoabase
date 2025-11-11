import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createSignatureVerification,
  verifySignature,
  isSignatureValid,
  type SignatureVerification,
} from '@/lib/onchain-signature-verification-utils';

export function useOnchainSignatureVerification() {
  const { address } = useAccount();
  const [verifications, setVerifications] = useState<SignatureVerification[]>([]);

  const verify = (
    signer: Address,
    message: string,
    signature: string,
    isValid: boolean
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const verification = createSignatureVerification(signer, message, signature);
    const updated = verifySignature(verification, isValid);
    setVerifications((prev) => [...prev, updated]);
    console.log('Verifying signature:', { signer, message });
  };

  return {
    verifications,
    verify,
    isSignatureValid,
    address,
  };
}

