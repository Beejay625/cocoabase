import { type Address } from 'viem';

export interface YieldComparison {
  id: bigint;
  owner: Address;
  cropType: string;
  yieldAmount: bigint;
  comparisonPeriod: string;
  benchmarkYield: bigint;
  comparisonDate: bigint;
  txHash: string;
}

export function createComparison(
  owner: Address,
  cropType: string,
  yieldAmount: bigint,
  comparisonPeriod: string,
  benchmarkYield: bigint
): YieldComparison {
  return {
    id: BigInt(Date.now()),
    owner,
    cropType,
    yieldAmount,
    comparisonPeriod,
    benchmarkYield,
    comparisonDate: BigInt(Date.now()),
    txHash: '',
  };
}
