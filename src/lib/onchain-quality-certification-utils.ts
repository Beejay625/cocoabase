import { type Address } from 'viem';

export interface QualityCertification {
  id: bigint;
  owner: Address;
  productId: bigint;
  qualityGrade: string;
  certifier: Address;
  issuedAt: bigint;
  expiresAt: bigint;
  txHash: string;
}

export function certifyQuality(
  owner: Address,
  productId: bigint,
  qualityGrade: string,
  certifier: Address,
  validityDays: number
): QualityCertification {
  const now = BigInt(Date.now());
  return {
    id: BigInt(Date.now()),
    owner,
    productId,
    qualityGrade,
    certifier,
    issuedAt: now,
    expiresAt: now + BigInt(validityDays * 24 * 60 * 60 * 1000),
    txHash: '',
  };
}
