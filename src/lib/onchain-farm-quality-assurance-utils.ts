import { type Address } from 'viem';

export interface QualityCheck {
  id: string;
  checkId: bigint;
  productId: bigint;
  inspector: Address;
  checkDate: bigint;
  qualityScore: bigint;
  standards: string;
  passed: boolean;
  notes: string;
}

export function createQualityCheck(
  address: Address,
  productId: bigint,
  qualityScore: bigint,
  standards: string,
  notes: string
): QualityCheck {
  return {
    id: `${Date.now()}-${Math.random()}`,
    checkId: BigInt(0),
    productId,
    inspector: address,
    checkDate: BigInt(Date.now()),
    qualityScore,
    standards,
    passed: qualityScore >= BigInt(80),
    notes,
  };
}
