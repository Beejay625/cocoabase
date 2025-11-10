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

export function approveLoan(
  application: LoanApplication,
  approver: Address
): LoanApplication | null {
  if (application.lender.toLowerCase() !== approver.toLowerCase()) return null;
  return {
    ...application,
    status: 'approved',
  };
}

export function calculateTotalRepayment(
  application: LoanApplication
): bigint {
  const interest = (application.amount * application.interestRate) / BigInt(10000);
  return application.amount + interest;
}

export function getPendingApplications(
  applications: LoanApplication[]
): LoanApplication[] {
  return applications.filter((a) => a.status === 'pending');
}
