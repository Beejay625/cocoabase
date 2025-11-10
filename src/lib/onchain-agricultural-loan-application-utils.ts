import { type Address } from 'viem';

export interface LoanApplication {
  id: bigint;
  applicant: Address;
  lender: Address;
  amount: bigint;
  interestRate: bigint;
  term: bigint;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed';
  txHash: string;
}

export function createLoanApplication(
  applicant: Address,
  lender: Address,
  amount: bigint,
  interestRate: bigint,
  term: bigint,
  purpose: string
): LoanApplication {
  return {
    id: BigInt(Date.now()),
    applicant,
    lender,
    amount,
    interestRate,
    term,
    purpose,
    status: 'pending',
    txHash: '',
  };
}
