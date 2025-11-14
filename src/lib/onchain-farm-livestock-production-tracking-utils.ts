import { type Address } from 'viem';

/**
 * Onchain farm livestock production tracking utilities
 * Production record creation and verification on blockchain
 */

export interface ProductionRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  productType: string;
  quantity: bigint;
  productionDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createProductionRecord(
  address: Address,
  animalId: string,
  productType: string,
  quantity: bigint,
  productionDate: bigint
): ProductionRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    productType,
    quantity,
    productionDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

