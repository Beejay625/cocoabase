import { type Address } from 'viem';

export interface Investment {
  id: bigint;
  owner: Address;
  investmentType: string;
  amount: bigint;
  investmentDate: bigint;
  expectedReturn: bigint;
  status: 'active' | 'completed' | 'failed';
  txHash: string;
}

export function recordInvestment(
  owner: Address,
  investmentType: string,
  amount: bigint,
  expectedReturn: bigint
): Investment {
  return {
    id: BigInt(Date.now()),
    owner,
    investmentType,
    amount,
    investmentDate: BigInt(Date.now()),
    expectedReturn,
    status: 'active',
    txHash: '',
  };
}
