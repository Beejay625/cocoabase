import { type Address } from 'viem';

export interface DecentralizedIdentity {
  address: Address;
  did: string;
  credentials: Credential[];
  reputation: number;
  verified: boolean;
  createdAt: bigint;
}

export interface Credential {
  id: string;
  issuer: Address;
  type: string;
  data: string;
  issuedAt: bigint;
  expiresAt?: bigint;
}

export function createIdentity(address: Address): DecentralizedIdentity {
  const now = BigInt(Date.now());
  return {
    address,
    did: `did:eth:${address}`,
    credentials: [],
    reputation: 0,
    verified: false,
    createdAt: now,
  };
}

export function addCredential(
  identity: DecentralizedIdentity,
  credential: Credential
): DecentralizedIdentity {
  return {
    ...identity,
    credentials: [...identity.credentials, credential],
  };
}

export function verifyIdentity(
  identity: DecentralizedIdentity
): DecentralizedIdentity {
  return {
    ...identity,
    verified: true,
  };
}

export function updateReputation(
  identity: DecentralizedIdentity,
  score: number
): DecentralizedIdentity {
  return {
    ...identity,
    reputation: Math.max(0, identity.reputation + score),
  };
}
