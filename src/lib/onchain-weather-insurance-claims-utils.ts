import { type Address } from 'viem';

/**
 * Onchain Weather Insurance Claims utilities
 * File and process weather-based insurance claims onchain
 */

export interface WeatherInsuranceClaim {
  id: bigint;
  claimant: Address;
  policyId: bigint;
  weatherEvent: 'drought' | 'flood' | 'storm' | 'frost' | 'heat';
  severity: number;
  damageAmount: bigint;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  filedAt: bigint;
  processedAt?: bigint;
  payoutAmount?: bigint;
}

export function fileWeatherInsuranceClaim(
  claimant: Address,
  policyId: bigint,
  weatherEvent: WeatherInsuranceClaim['weatherEvent'],
  severity: number,
  damageAmount: bigint
): WeatherInsuranceClaim {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    claimant,
    policyId,
    weatherEvent,
    severity,
    damageAmount,
    status: 'pending',
    filedAt: now,
  };
}

export function processWeatherInsuranceClaim(
  claim: WeatherInsuranceClaim,
  approved: boolean,
  payoutAmount?: bigint
): WeatherInsuranceClaim {
  const now = BigInt(Date.now());
  return {
    ...claim,
    status: approved ? 'approved' : 'rejected',
    processedAt: now,
    payoutAmount: approved ? payoutAmount || calculatePayoutAmount(claim) : undefined,
  };
}

export function calculatePayoutAmount(claim: WeatherInsuranceClaim): bigint {
  const severityMultiplier = BigInt(Math.floor(claim.severity * 100));
  return (claim.damageAmount * severityMultiplier) / BigInt(10000);
}

export function isClaimEligible(claim: WeatherInsuranceClaim): boolean {
  return claim.status === 'pending' && claim.severity >= 50;
}

export function calculateClaimProcessingFee(claim: WeatherInsuranceClaim): bigint {
  return (claim.damageAmount * BigInt(2)) / BigInt(100);
}

