import { type Address } from 'viem';

/**
 * Onchain farm crop insurance premium utilities
 * Premium calculation creation and updates
 */

export interface PremiumCalculation {
  id: string;
  plantationId: string;
  calculatedBy: Address;
  coverageAmount: bigint;
  riskFactor: number;
  cropType: string;
  premium: bigint;
  timestamp: bigint;
}

export function createPremiumCalculation(
  address: Address,
  plantationId: string,
  coverageAmount: bigint,
  riskFactor: number,
  cropType: string
): PremiumCalculation {
  const premium = (coverageAmount * BigInt(riskFactor)) / BigInt(100);
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    calculatedBy: address,
    coverageAmount,
    riskFactor,
    cropType,
    premium,
    timestamp: BigInt(Date.now()),
  };
}

