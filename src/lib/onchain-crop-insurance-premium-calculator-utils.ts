import { type Address } from 'viem';

export interface PremiumCalculation {
  id: bigint;
  plantationId: bigint;
  coverage: bigint;
  rate: number;
  premium: bigint;
  timestamp: bigint;
}

export function calculatePremium(
  plantationId: bigint,
  coverage: bigint,
  rate: number
): PremiumCalculation {
  const premium = (coverage * BigInt(Math.floor(rate * 100))) / BigInt(10000);
  return {
    id: BigInt(0),
    plantationId,
    coverage,
    rate,
    premium,
    timestamp: BigInt(Date.now()),
  };
}

export function getPremiumsByPlantation(
  calculations: PremiumCalculation[],
  plantationId: bigint
): PremiumCalculation[] {
  return calculations.filter((c) => c.plantationId === plantationId);
}

export function calculateTotalPremium(
  calculations: PremiumCalculation[]
): bigint {
  return calculations.reduce((total, c) => total + c.premium, BigInt(0));
}

export function getRecentCalculations(
  calculations: PremiumCalculation[],
  days: number
): PremiumCalculation[] {
  const cutoff = BigInt(Date.now() - days * 24 * 60 * 60 * 1000);
  return calculations.filter((c) => c.timestamp >= cutoff);
}
