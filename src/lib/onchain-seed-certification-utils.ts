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

export function isCertificationValid(
  cert: SeedCertification,
  currentTime: bigint
): boolean {
  return currentTime < cert.expiresAt;
}

export function getExpiringCertifications(
  certs: SeedCertification[],
  currentTime: bigint,
  daysThreshold: number
): SeedCertification[] {
  const threshold = BigInt(daysThreshold * 24 * 60 * 60 * 1000);
  return certs.filter((cert) => {
    const timeUntilExpiry = cert.expiresAt - currentTime;
    return timeUntilExpiry > BigInt(0) && timeUntilExpiry <= threshold;
  });
}
