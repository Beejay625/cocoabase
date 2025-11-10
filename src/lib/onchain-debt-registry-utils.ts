import { type Address } from 'viem';

export interface DebtRegistry {
  id: bigint;
  borrower: Address;
  lender: Address;
  principal: bigint;
  interest: bigint;
  dueDate: bigint;
  status: 'active' | 'repaid' | 'defaulted';
}

export function createDebtRegistry(
  borrower: Address,
  lender: Address,
  principal: bigint,
  interest: bigint,
  dueDate: bigint
): DebtRegistry {
  return {
    id: BigInt(0),
    borrower,
    lender,
    principal,
    interest,
    dueDate,
    status: 'active',
  };
}

export function repayDebt(
  debt: DebtRegistry,
  amount: bigint,
  currentTime: bigint
): DebtRegistry {
  const totalOwed = debt.principal + debt.interest;
  if (amount >= totalOwed) {
    return { ...debt, status: 'repaid' };
  }
  return debt;
}

export function defaultDebt(
  debt: DebtRegistry,
  currentTime: bigint
): DebtRegistry | null {
  if (debt.status !== 'active') return null;
  if (currentTime <= debt.dueDate) return null;
  return { ...debt, status: 'defaulted' };
}

export function calculateTotalDebt(debt: DebtRegistry): bigint {
  return debt.principal + debt.interest;
}
