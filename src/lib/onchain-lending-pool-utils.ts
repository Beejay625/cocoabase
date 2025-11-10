import { type Address } from 'viem';

export interface LendingPool {
  id: bigint;
  token: Address;
  interestRate: number;
  totalLent: bigint;
  totalBorrowed: bigint;
  reserve: bigint;
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
    reserve: BigInt(0),
  };
}

export function supplyLiquidity(
  pool: LendingPool,
  lender: Address,
  amount: bigint
): LendingPool {
  return {
    ...pool,
    totalLent: pool.totalLent + amount,
    reserve: pool.reserve + amount,
  };
}

export function borrow(
  pool: LendingPool,
  borrower: Address,
  amount: bigint,
  collateral: bigint
): LendingPool | null {
  if (amount > pool.reserve) return null;
  const interest = (amount * BigInt(Math.floor(pool.interestRate * 100))) / BigInt(10000);
  return {
    ...pool,
    totalBorrowed: pool.totalBorrowed + amount,
    reserve: pool.reserve - amount,
  };
}

export function calculateBorrowRate(
  pool: LendingPool
): number {
  if (pool.totalLent === BigInt(0)) return pool.interestRate;
  const utilization = Number((pool.totalBorrowed * BigInt(10000)) / pool.totalLent) / 100;
  return pool.interestRate + utilization * 0.1;
}
