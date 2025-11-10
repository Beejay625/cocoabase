import { type Address } from 'viem';

export interface Loan {
  id: bigint;
  borrower: Address;
  lender: Address;
  principal: bigint;
  interestRate: number;
  duration: bigint;
  collateral: bigint;
  collateralToken: Address;
  status: 'pending' | 'active' | 'repaid' | 'liquidated';
  createdAt: bigint;
  dueDate: bigint;
  amountRepaid: bigint;
}

export function createLoan(
  borrower: Address,
  lender: Address,
  principal: bigint,
  interestRate: number,
  duration: bigint,
  collateral: bigint,
  collateralToken: Address
): Loan {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    borrower,
    lender,
    principal,
    interestRate,
    duration,
    collateral,
    collateralToken,
    status: 'pending',
    createdAt: now,
    dueDate: now + duration,
    amountRepaid: BigInt(0),
  };
}

export function repayLoan(
  loan: Loan,
  amount: bigint,
  currentTime: bigint
): Loan | null {
  if (loan.status !== 'active') return null;
  if (currentTime > loan.dueDate) return null;

  const totalOwed = calculateTotalOwed(loan);
  const newAmountRepaid = loan.amountRepaid + amount;
  const newStatus = newAmountRepaid >= totalOwed ? 'repaid' : loan.status;

  return {
    ...loan,
    amountRepaid: newAmountRepaid,
    status: newStatus,
  };
}

export function liquidateLoan(
  loan: Loan,
  currentTime: bigint
): Loan | null {
  if (loan.status !== 'active') return null;
  if (currentTime <= loan.dueDate) return null;

  return {
    ...loan,
    status: 'liquidated',
  };
}

export function calculateTotalOwed(loan: Loan): bigint {
  const interest = (loan.principal * BigInt(Math.floor(loan.interestRate * 100))) / BigInt(10000);
  return loan.principal + interest;
}

export function calculateRemainingBalance(loan: Loan): bigint {
  const totalOwed = calculateTotalOwed(loan);
  return totalOwed > loan.amountRepaid ? totalOwed - loan.amountRepaid : BigInt(0);
}
