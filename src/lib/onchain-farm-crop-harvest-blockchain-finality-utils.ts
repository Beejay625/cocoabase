import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain finality utilities
 * Finality record creation on blockchain
 */

export interface FinalityRecord {
  id: string;
  harvestId: string;
  finalizedBy: Address;
  finalityType: string;
  finalityDate: bigint;
  confirmations: number;
  confirmed: boolean;
  timestamp: bigint;
}

export function createFinalityRecord(
  address: Address,
  harvestId: string,
  finalityType: string,
  finalityDate: bigint,
  confirmations: number
): FinalityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    finalizedBy: address,
    finalityType,
    finalityDate,
    confirmations,
    confirmed: false,
    timestamp: BigInt(Date.now()),
  };
}

