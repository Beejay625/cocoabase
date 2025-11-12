import { type Address } from 'viem';

export interface EnergyRecord {
  id: bigint;
  recorder: Address;
  source: 'solar' | 'wind' | 'grid' | 'biomass';
  amount: bigint;
  timestamp: bigint;
}

export function createEnergyRecord(
  recorder: Address,
  source: 'solar' | 'wind' | 'grid' | 'biomass',
  amount: bigint
): EnergyRecord {
  return {
    id: BigInt(0),
    recorder,
    source,
    amount,
    timestamp: BigInt(Date.now()),
  };
}

