import { type Address } from 'viem';

/**
 * Onchain derivatives utilities
 * Financial derivatives and options
 */

export interface Derivative {
  id: bigint;
  underlying: Address;
  strikePrice: bigint;
  expiry: bigint;
  type: 'call' | 'put';
}

export function calculateOptionValue(
  spotPrice: bigint,
  strikePrice: bigint,
  type: 'call' | 'put'
): bigint {
  if (type === 'call') {
    return spotPrice > strikePrice ? spotPrice - strikePrice : BigInt(0);
  }
  return strikePrice > spotPrice ? strikePrice - spotPrice : BigInt(0);
}

export function isOptionExpired(
  derivative: Derivative,
  currentTime: bigint
): boolean {
  return currentTime >= derivative.expiry;
}
