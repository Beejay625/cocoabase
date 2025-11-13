import { type Address } from 'viem';

/**
 * Onchain farm soil carbon sequestration utilities
 * Carbon sequestration tracking and verification
 */

export interface CarbonSequestration {
  id: string;
  plantationId: string;
  recordedBy: Address;
  carbonAmount: bigint;
  method: string;
  timestamp: bigint;
  verified: boolean;
}

export function createCarbonSequestration(
  address: Address,
  plantationId: string,
  carbonAmount: bigint,
  method: string
): CarbonSequestration {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    carbonAmount,
    method,
    timestamp: BigInt(Date.now()),
    verified: false,
  };
}

