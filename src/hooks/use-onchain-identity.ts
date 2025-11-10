import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createIdentity,
  issueCredential,
  verifyCredential,
  updateReputation,
  type DecentralizedIdentity,
} from '@/lib/onchain-identity-utils';

export function useOnchainIdentity() {
  const { address } = useAccount();
  const [identity, setIdentity] = useState<DecentralizedIdentity | null>(null);

  const initializeIdentity = () => {
    if (!address) throw new Error('Wallet not connected');
    const newIdentity = createIdentity(address);
    setIdentity(newIdentity);
    return newIdentity;
  };

  const addCredential = (
    issuer: Address,
    credentialType: string,
    data: string,
    expiresAt?: bigint
  ) => {
    if (!identity) throw new Error('Identity not initialized');
    const updated = issueCredential(identity, issuer, credentialType, data, expiresAt);
    setIdentity(updated);
  };

  return {
    identity,
    initializeIdentity,
    addCredential,
    verifyCredential,
    updateReputation,
    address,
  };
}

