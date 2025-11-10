import { type Address } from 'viem';

/**
 * Onchain options utilities
 * Options trading and management
 */

export interface Option {
  id: bigint;
  underlying: Address;
  strikePrice: bigint;
  expiry: bigint;
  type: 'call' | 'put';
  premium: bigint;
}

export function calculateOptionPremium(
  spotPrice: bigint,
  strikePrice: bigint,
  timeToExpiry: bigint,
  volatility: number
): bigint {
  // Simplified Black-Scholes calculation
  return (spotPrice * BigInt(Math.floor(volatility * 100))) / BigInt(10000);
}
