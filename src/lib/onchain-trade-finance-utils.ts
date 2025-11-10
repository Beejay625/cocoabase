import { type Address } from 'viem';

export interface TradeFinance {
  id: bigint;
  borrower: Address;
  lender: Address;
  amount: bigint;
  interestRate: bigint;
  term: bigint;
  status: 'pending' | 'approved' | 'repaid';
  txHash: string;
}

export function createTradeFinance(
  borrower: Address,
  lender: Address,
  amount: bigint,
  interestRate: bigint,
  term: bigint
): TradeFinance {
  return {
    id: BigInt(Date.now()),
    borrower,
    lender,
    amount,
    interestRate,
    term,
    status: 'pending',
    txHash: '',
  };
}
