import { type Address } from 'viem';

/**
 * Onchain factory utilities
 * Contract factories and clone patterns
 */

export interface FactoryContract {
  factory: Address;
  template: Address;
  clones: Address[];
}

/**
 * Calculate clone address
 */
export function calculateCloneAddress(
  factory: Address,
  template: Address,
  salt: string
): string {
  // Simplified - in production use CREATE2 calculation
  return `0x${factory.slice(2, 10)}${template.slice(2, 10)}${salt.slice(0, 20)}`;
}

