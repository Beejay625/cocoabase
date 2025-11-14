import { type Address } from 'viem';

/**
 * Onchain farm livestock reproduction utilities
 * Reproduction record creation and birth recording
 */

export interface ReproductionRecord {
  id: string;
  sireId: string;
  damId: string;
  recordedBy: Address;
  matingDate: bigint;
  expectedCalvingDate: bigint;
  offspringId?: string;
  timestamp: bigint;
}

export function createReproductionRecord(
  address: Address,
  sireId: string,
  damId: string,
  matingDate: bigint,
  expectedCalvingDate: bigint
): ReproductionRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    sireId,
    damId,
    recordedBy: address,
    matingDate,
    expectedCalvingDate,
    timestamp: BigInt(Date.now()),
  };
}

