import { type Address } from 'viem';

/**
 * Onchain farm energy consumption tracking utilities
 * Energy consumption recording and verification
 */

export interface EnergyConsumption {
  id: string;
  plantationId: string;
  recordedBy: Address;
  energyType: string;
  amount: bigint;
  cost: bigint;
  period: string;
  verified: boolean;
  timestamp: bigint;
}

export function createEnergyConsumption(
  address: Address,
  plantationId: string,
  energyType: string,
  amount: bigint,
  cost: bigint,
  period: string
): EnergyConsumption {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    energyType,
    amount,
    cost,
    period,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}
