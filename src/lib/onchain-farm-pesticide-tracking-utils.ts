import { type Address } from 'viem';

/**
 * Onchain farm pesticide tracking utilities
 * Pesticide application tracking and verification
 */

export interface PesticideRecord {
  id: string;
  plantationId: string;
  recordedBy: Address;
  pesticideType: string;
  amount: bigint;
  applicationDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createPesticideRecord(
  address: Address,
  plantationId: string,
  pesticideType: string,
  amount: bigint,
  applicationDate: bigint
): PesticideRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    pesticideType,
    amount,
    applicationDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

