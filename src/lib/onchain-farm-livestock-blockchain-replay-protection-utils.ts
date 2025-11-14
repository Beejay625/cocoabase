import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain replay protection utilities
 * Replay protection creation on blockchain
 */

export interface ReplayProtection {
  id: string;
  animalId: string;
  protectedBy: Address;
  transactionHash: string;
  protectionDate: bigint;
  chainId: number;
  verified: boolean;
  timestamp: bigint;
}

export function createReplayProtection(
  address: Address,
  animalId: string,
  transactionHash: string,
  protectionDate: bigint,
  chainId: number
): ReplayProtection {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    protectedBy: address,
    transactionHash,
    protectionDate,
    chainId,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

