import { type Address } from 'viem';

export interface InsurancePremium {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  coverageAmount: bigint;
  premiumRate: bigint;
  calculatedPremium: bigint;
  calculationDate: bigint;
  txHash: string;
}

export function calculatePremium(
  owner: Address,
  plantationId: bigint,
  coverageAmount: bigint,
  premiumRate: bigint
): InsurancePremium {
  const calculatedPremium = (coverageAmount * premiumRate) / BigInt(10000);
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    coverageAmount,
    premiumRate,
    calculatedPremium,
    calculationDate: BigInt(Date.now()),
    txHash: '',
  };
}
