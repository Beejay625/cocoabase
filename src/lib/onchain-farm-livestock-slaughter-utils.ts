import { type Address } from 'viem';

/**
 * Onchain farm livestock slaughter utilities
 * Slaughter record creation and verification
 */

export interface SlaughterRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  slaughterDate: bigint;
  slaughterhouse: string;
  certification: string;
  verified: boolean;
  timestamp: bigint;
}

export function createSlaughterRecord(
  address: Address,
  animalId: string,
  slaughterDate: bigint,
  slaughterhouse: string,
  certification: string
): SlaughterRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    slaughterDate,
    slaughterhouse,
    certification,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

