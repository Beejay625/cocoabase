import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain validation utilities
 * Validation record creation on blockchain
 */

export interface ValidationRecord {
  id: string;
  harvestId: string;
  validatedBy: Address;
  validator: Address;
  validationType: string;
  validationDate: bigint;
  result: boolean;
  confirmed: boolean;
  timestamp: bigint;
}

export function createValidationRecord(
  address: Address,
  harvestId: string,
  validator: Address,
  validationType: string,
  validationDate: bigint,
  result: boolean
): ValidationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    validatedBy: address,
    validator,
    validationType,
    validationDate,
    result,
    confirmed: false,
    timestamp: BigInt(Date.now()),
  };
}

