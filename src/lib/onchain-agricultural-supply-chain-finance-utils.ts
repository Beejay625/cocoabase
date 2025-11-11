import { type Address } from 'viem';

export interface SupplyChainFinance {
  id: bigint;
  borrower: Address;
  lender: Address;
  amount: bigint;
  interestRate: bigint;
  collateral: string;
  status: 'pending' | 'approved' | 'disbursed' | 'repaid';
  txHash: string;
}

export function createFinanceRequest(
  borrower: Address,
  lender: Address,
  amount: bigint,
  interestRate: bigint,
  collateral: string
): SupplyChainFinance {
  return {
    id: BigInt(Date.now()),
    borrower,
    lender,
    amount,
    interestRate,
    collateral,
    status: 'pending',
    txHash: '',
  };
}

export function approveFinance(
  finance: SupplyChainFinance,
  approver: Address
): SupplyChainFinance | null {
  if (finance.lender.toLowerCase() !== approver.toLowerCase()) return null;
  return {
    ...finance,
    status: 'approved',
  };
}

export function calculateRepayment(
  finance: SupplyChainFinance
): bigint {
  const interest = (finance.amount * finance.interestRate) / BigInt(10000);
  return finance.amount + interest;
}

export function getPendingRequests(
  finances: SupplyChainFinance[]
): SupplyChainFinance[] {
  return finances.filter((f) => f.status === 'pending');
}
