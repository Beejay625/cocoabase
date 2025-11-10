import { type Address } from 'viem';

export interface DebtRegistry {
  id: bigint;
  debtor: Address;
  creditor: Address;
  amount: bigint;
  interestRate: number;
  dueDate: bigint;
  status: 'active' | 'repaid' | 'defaulted';
  repaid: bigint;
}

export function createDebtRegistry(
  debtor: Address,
  creditor: Address,
  amount: bigint,
  interestRate: number,
  duration: bigint
): DebtRegistry {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    debtor,
    creditor,
    amount,
    interestRate,
    dueDate: now + duration,
    status: 'active',
    repaid: BigInt(0),
  };
}

export function repayDebt(
  debt: DebtRegistry,
  amount: bigint,
  currentTime: bigint
): DebtRegistry {
  const totalOwed = calculateTotalOwed(debt);
  const newRepaid = debt.repaid + amount;
  const newStatus = newRepaid >= totalOwed ? 'repaid' : debt.status;
  return {
    ...debt,
    repaid: newRepaid,
    status: newStatus,
  };
}

export function calculateTotalOwed(debt: DebtRegistry): bigint {
  const interest = (debt.amount * BigInt(Math.floor(debt.interestRate * 100))) / BigInt(10000);
  return debt.amount + interest;
}

export function isDebtOverdue(debt: DebtRegistry, currentTime: bigint): boolean {
  return currentTime > debt.dueDate && debt.status === 'active';
}
