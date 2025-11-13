import { type Address } from 'viem';

export interface EnergyConsumption {
  id: bigint;
  recorder: Address;
  source: string;
  amount: bigint;
  timestamp: bigint;
}

export function createEnergyConsumption(
  recorder: Address,
  source: string,
  amount: bigint
): EnergyConsumption {
  return {
    id: BigInt(Date.now()),
    recorder,
    source,
    amount,
    timestamp: BigInt(Date.now()),
  };
}
