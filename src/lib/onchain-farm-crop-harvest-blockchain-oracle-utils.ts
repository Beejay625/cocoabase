import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain oracle utilities
 * Oracle data creation on blockchain
 */

export interface OracleData {
  id: string;
  harvestId: string;
  submittedBy: Address;
  dataType: string;
  dataValue: string;
  oracleSource: string;
  submissionDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createOracleData(
  address: Address,
  harvestId: string,
  dataType: string,
  dataValue: string,
  oracleSource: string,
  submissionDate: bigint
): OracleData {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    submittedBy: address,
    dataType,
    dataValue,
    oracleSource,
    submissionDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

