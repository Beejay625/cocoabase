import { type Address } from 'viem';

export interface WeatherData {
  id: bigint;
  recorder: Address;
  temperature: number;
  rainfall: number;
  humidity: number;
  timestamp: bigint;
}

export function createWeatherData(
  recorder: Address,
  temperature: number,
  rainfall: number,
  humidity: number
): WeatherData {
  return {
    id: BigInt(Date.now()),
    recorder,
    temperature,
    rainfall,
    humidity,
    timestamp: BigInt(Date.now()),
  };
}
