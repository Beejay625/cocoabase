import { type Address } from 'viem';

export interface QualityCheck {
  id: bigint;
  inspector: Address;
  product: string;
  grade: 'A' | 'B' | 'C' | 'D';
  passed: boolean;
  timestamp: bigint;
}

export function createQualityCheck(
  inspector: Address,
  product: string,
  grade: 'A' | 'B' | 'C' | 'D',
  passed: boolean
): QualityCheck {
  return {
    id: BigInt(0),
    inspector,
    product,
    grade,
    passed,
    timestamp: BigInt(Date.now()),
  };
}
