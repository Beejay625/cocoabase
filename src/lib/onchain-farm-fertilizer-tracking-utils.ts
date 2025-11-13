import { type Address } from 'viem';

/**
 * Onchain farm fertilizer tracking utilities
 * Fertilizer application tracking and verification
 */

export interface FertilizerRecord {
  id: string;
  plantationId: string;
  recordedBy: Address;
  fertilizerType: string;
  amount: bigint;
  applicationDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createFertilizerRecord(
  address: Address,
  plantationId: string,
  fertilizerType: string,
  amount: bigint,
  applicationDate: bigint
): FertilizerRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    fertilizerType,
    amount,
    applicationDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

