import { type Address } from 'viem';

export interface SeedCertification {
  id: bigint;
  owner: Address;
  seedType: string;
  certificationNumber: string;
  issuedAt: bigint;
  expiresAt: bigint;
  txHash: string;
}

export function certifySeed(
  owner: Address,
  seedType: string,
  certificationNumber: string,
  validityDays: number
): SeedCertification {
  const now = BigInt(Date.now());
  return {
    id: BigInt(Date.now()),
    owner,
    seedType,
    certificationNumber,
    issuedAt: now,
    expiresAt: now + BigInt(validityDays * 24 * 60 * 60 * 1000),
    txHash: '',
  };
}
