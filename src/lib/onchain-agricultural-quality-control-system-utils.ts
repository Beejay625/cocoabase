import { type Address } from 'viem';

export interface QualityCheck {
  id: bigint;
  inspector: Address;
  productId: bigint;
  qualityScore: number;
  checkDate: bigint;
  passed: boolean;
  txHash: string;
}

export function performQualityCheck(
  inspector: Address,
  productId: bigint,
  qualityScore: number
): QualityCheck {
  return {
    id: BigInt(Date.now()),
    inspector,
    productId,
    qualityScore,
    checkDate: BigInt(Date.now()),
    passed: qualityScore >= 70,
    txHash: '',
  };
}
