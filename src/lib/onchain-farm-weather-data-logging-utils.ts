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

export function getAverageTemperature(
  data: WeatherData[]
): number {
  if (data.length === 0) return 0;
  const total = data.reduce((sum, d) => sum + d.temperature, 0);
  return total / data.length;
}

export function getTotalRainfall(
  data: WeatherData[]
): number {
  return data.reduce((total, d) => total + d.rainfall, 0);
}
