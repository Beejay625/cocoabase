import { type Address } from 'viem';

export interface EnergyConsumption {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  energyType: 'electricity' | 'fuel' | 'solar' | 'wind';
  consumption: bigint;
  unit: string;
  consumptionDate: bigint;
  txHash: string;
}

export function recordEnergyConsumption(
  owner: Address,
  plantationId: bigint,
  energyType: EnergyConsumption['energyType'],
  consumption: bigint,
  unit: string
): EnergyConsumption {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    energyType,
    consumption,
    unit,
    consumptionDate: BigInt(Date.now()),
    txHash: '',
  };
}
