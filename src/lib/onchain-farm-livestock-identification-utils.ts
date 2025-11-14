import { type Address } from 'viem';

/**
 * Onchain farm livestock identification utilities
 * Identification creation and verification
 */

export interface LivestockIdentification {
  id: string;
  animalId: string;
  identifiedBy: Address;
  identificationType: string;
  identificationNumber: string;
  identificationDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createIdentification(
  address: Address,
  animalId: string,
  identificationType: string,
  identificationNumber: string,
  identificationDate: bigint
): LivestockIdentification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    identifiedBy: address,
    identificationType,
    identificationNumber,
    identificationDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

