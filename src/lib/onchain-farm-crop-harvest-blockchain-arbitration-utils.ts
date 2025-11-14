import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain arbitration utilities
 * Arbitration creation on blockchain
 */

export interface Arbitration {
  id: string;
  harvestId: string;
  createdBy: Address;
  dispute: string;
  parties: Address[];
  arbitrator: Address;
  arbitrationDate: bigint;
  resolution?: string;
  resolved: boolean;
  timestamp: bigint;
}

export function createArbitration(
  address: Address,
  harvestId: string,
  dispute: string,
  parties: Address[],
  arbitrator: Address,
  arbitrationDate: bigint
): Arbitration {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    dispute,
    parties,
    arbitrator,
    arbitrationDate,
    resolved: false,
    timestamp: BigInt(Date.now()),
  };
}

