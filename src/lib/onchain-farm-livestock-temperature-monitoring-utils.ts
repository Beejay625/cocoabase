import { type Address } from 'viem';

/**
 * Onchain farm livestock temperature monitoring utilities
 * Temperature reading creation on blockchain
 */

export interface TemperatureReading {
  id: string;
  animalId: string;
  recordedBy: Address;
  temperature: number;
  measurementDate: bigint;
  measurementMethod: string;
  verified: boolean;
  timestamp: bigint;
}

export function createTemperatureReading(
  address: Address,
  animalId: string,
  temperature: number,
  measurementDate: bigint,
  measurementMethod: string
): TemperatureReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    temperature,
    measurementDate,
    measurementMethod,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

