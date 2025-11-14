import { type Address } from 'viem';

/**
 * Onchain farm weather data utilities
 * Weather data oracle and tracking
 */

export interface WeatherRecord {
  id: string;
  recordId: bigint;
  location: string;
  timestamp: bigint;
  temperature: bigint;
  humidity: bigint;
  rainfall: bigint;
  windSpeed: bigint;
  conditions: string;
  reporter: Address;
}

export function createWeatherRecord(
  address: Address,
  location: string,
  temperature: bigint,
  humidity: bigint,
  rainfall: bigint,
  windSpeed: bigint,
  conditions: string
): WeatherRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    location,
    timestamp: BigInt(Date.now()),
    temperature,
    humidity,
    rainfall,
    windSpeed,
    conditions,
    reporter: address,
  };
}

