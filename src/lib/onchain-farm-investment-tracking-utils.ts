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
