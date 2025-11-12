import { type Address } from 'viem';

export interface Investment {
  id: bigint;
  investor: Address;
  investmentType: string;
  amount: bigint;
  expectedReturn: bigint;
  status: 'active' | 'completed' | 'cancelled';
}

export function createInvestment(
  investor: Address,
  investmentType: string,
  amount: bigint,
  expectedReturn: bigint
): Investment {
  return {
    id: BigInt(0),
    investor,
    investmentType,
    amount,
    expectedReturn,
    status: 'active',
  };
}

export function getActiveInvestments(
  investments: Investment[]
): Investment[] {
  return investments.filter((i) => i.status === 'active');
}

export function calculateTotalInvestment(
  investments: Investment[]
): bigint {
  return investments.reduce((total, i) => total + i.amount, BigInt(0));
}

export function calculateExpectedReturn(
  investments: Investment[]
): bigint {
  return investments.reduce(
    (total, i) => total + i.expectedReturn,
    BigInt(0)
  );
}
