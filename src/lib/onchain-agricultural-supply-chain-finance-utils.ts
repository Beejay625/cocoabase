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
