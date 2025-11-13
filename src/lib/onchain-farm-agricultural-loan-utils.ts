import { type Address } from 'viem';

/**
 * Onchain farm agricultural loan utilities
 * Agricultural loan application and approval
 */

export interface AgriculturalLoan {
  id: string;
  plantationId: string;
  applicant: Address;
  amount: bigint;
  interestRate: bigint;
  duration: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed';
  timestamp: bigint;
}

export function createLoan(
  address: Address,
  plantationId: string,
  amount: bigint,
  interestRate: bigint,
  duration: number,
  purpose: string
): AgriculturalLoan {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    applicant: address,
    amount,
    interestRate,
    duration,
    purpose,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}

