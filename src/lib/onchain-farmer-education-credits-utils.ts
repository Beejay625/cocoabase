import { type Address } from 'viem';

/**
 * Onchain Farmer Education Credits utilities
 * Manage education credits for farmers onchain
 */

export interface EducationCredit {
  id: bigint;
  farmer: Address;
  courseTitle: string;
  provider: string;
  credits: number;
  completedAt: bigint;
  certificationHash: string;
  status: 'pending' | 'verified' | 'expired';
}

export function createEducationCredit(
  farmer: Address,
  courseTitle: string,
  provider: string,
  credits: number,
  certificationHash: string
): EducationCredit {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    farmer,
    courseTitle,
    provider,
    credits,
    completedAt: now,
    certificationHash,
    status: 'pending',
  };
}

export function verifyEducationCredit(
  credit: EducationCredit
): EducationCredit {
  if (credit.status !== 'pending') return credit;
  return {
    ...credit,
    status: 'verified',
  };
}

export function calculateTotalCredits(credits: EducationCredit[]): number {
  return credits
    .filter((c) => c.status === 'verified')
    .reduce((total, c) => total + c.credits, 0);
}

export function getEducationLevel(totalCredits: number): string {
  if (totalCredits >= 100) return 'Expert';
  if (totalCredits >= 50) return 'Advanced';
  if (totalCredits >= 20) return 'Intermediate';
  return 'Beginner';
}

export function isCreditExpired(
  credit: EducationCredit,
  expiryDays: number,
  currentTime: bigint
): boolean {
  const expiryTime = credit.completedAt + BigInt(expiryDays * 24 * 60 * 60 * 1000);
  return currentTime > expiryTime;
}

