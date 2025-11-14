import { type Address } from 'viem';

/**
 * Onchain farm livestock feed consumption utilities
 * Consumption record creation on blockchain
 */

export interface ConsumptionRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  feedType: string;
  amount: bigint;
  consumptionDate: bigint;
  timestamp: bigint;
}

export function createConsumptionRecord(
  address: Address,
  animalId: string,
  feedType: string,
  amount: bigint,
  consumptionDate: bigint
): ConsumptionRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    feedType,
    amount,
    consumptionDate,
    timestamp: BigInt(Date.now()),
  };
}

