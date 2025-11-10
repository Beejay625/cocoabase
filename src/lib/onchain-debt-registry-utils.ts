import { type Address } from 'viem';

export interface DebtRegistry {
  id: bigint;
  debtor: Address;
  creditor: Address;
  amount: bigint;
  interestRate: number;
  dueDate: bigint;
  status: 'active' | 'repaid' | 'defaulted';
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
  };
}

