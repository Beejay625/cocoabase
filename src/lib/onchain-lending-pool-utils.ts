import { type Address } from 'viem';

export interface LendingPool {
  id: bigint;
  token: Address;
  interestRate: number;
  totalLent: bigint;
  totalBorrowed: bigint;
  utilizationRate: number;
}

export interface Loan {
  borrower: Address;
  amount: bigint;
  collateral: bigint;
  interest: bigint;
  dueDate: bigint;
}

export function createLendingPool(
  token: Address,
  interestRate: number
): LendingPool {
  return {
    id: BigInt(0),
    token,
    interestRate,
    totalLent: BigInt(0),
    totalBorrowed: BigInt(0),
    utilizationRate: 0,
  };
}

export function lendToPool(
  pool: LendingPool,
  lender: Address,
  amount: bigint
): LendingPool {
  const newUtilization = pool.totalLent > BigInt(0)
    ? Number((pool.totalBorrowed * BigInt(10000)) / (pool.totalLent + amount)) / 100
    : 0;
  return {
    ...pool,
    totalLent: pool.totalLent + amount,
    utilizationRate: newUtilization,
  };
}

export function borrowFromPool(
  pool: LendingPool,
  borrower: Address,
  amount: bigint,
  collateral: bigint,
  duration: bigint
): { pool: LendingPool; loan: Loan } | null {
  if (pool.totalLent < amount) return null;
  const interest = (amount * BigInt(Math.floor(pool.interestRate * 100))) / BigInt(10000);
  const now = BigInt(Date.now());
  const newUtilization = Number((pool.totalBorrowed + amount) * BigInt(10000) / pool.totalLent) / 100;
  return {
    pool: {
      ...pool,
      totalBorrowed: pool.totalBorrowed + amount,
      utilizationRate: newUtilization,
    },
    loan: {
      borrower,
      amount,
      collateral,
      interest,
      dueDate: now + duration,
    },
  };
}
