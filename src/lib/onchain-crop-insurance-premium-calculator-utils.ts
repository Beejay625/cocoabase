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

export function getPremiumsByPlantation(
  premiums: InsurancePremium[],
  plantationId: bigint
): InsurancePremium[] {
  return premiums.filter((p) => p.plantationId === plantationId);
}

export function calculateTotalPremium(
  premiums: InsurancePremium[]
): bigint {
  return premiums.reduce((total, p) => total + p.calculatedPremium, BigInt(0));
}

export function getRecentCalculations(
  premiums: InsurancePremium[],
  days: number
): InsurancePremium[] {
  const cutoff = BigInt(Date.now() - days * 24 * 60 * 60 * 1000);
  return premiums.filter((p) => p.calculationDate >= cutoff);
}
