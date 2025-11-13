import { type Address } from 'viem';

/**
 * Onchain farm soil moisture sensing utilities
 * Moisture reading creation and verification
 */

export interface MoistureReading {
  id: string;
  plantationId: string;
  recordedBy: Address;
  moistureLevel: number;
  depth: number;
  sensorLocation: string;
  readingDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createMoistureReading(
  address: Address,
  plantationId: string,
  moistureLevel: number,
  depth: number,
  sensorLocation: string,
  readingDate: bigint
): MoistureReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    moistureLevel,
    depth,
    sensorLocation,
    readingDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

