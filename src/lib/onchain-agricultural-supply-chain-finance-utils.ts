import { type Address } from 'viem';

export interface FinanceRequest {
  id: bigint;
  borrower: Address;
  amount: bigint;
  collateral: bigint;
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected' | 'repaid';
}

export function createFinanceRequest(
  borrower: Address,
  amount: bigint,
  collateral: bigint,
  interestRate: number
): FinanceRequest {
  return {
    id: BigInt(0),
    borrower,
    amount,
    collateral,
    interestRate,
    status: 'pending',
  };
}

export function approveRequest(
  request: FinanceRequest,
  lender: Address
): FinanceRequest {
  return {
    ...request,
    status: 'approved',
  };
}

export function calculateRepayment(
  request: FinanceRequest
): bigint {
  const interest = (request.amount * BigInt(Math.floor(request.interestRate * 100))) / BigInt(10000);
  return request.amount + interest;
}

export function getPendingRequests(
  requests: FinanceRequest[]
): FinanceRequest[] {
  return requests.filter((r) => r.status === 'pending');
}
