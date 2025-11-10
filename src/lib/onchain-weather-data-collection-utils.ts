import { type Address } from 'viem';

export interface WeatherData {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  recordedDate: bigint;
  txHash: string;
}

export function recordWeatherData(
  owner: Address,
  plantationId: bigint,
  temperature: number,
  humidity: number,
  rainfall: number,
  windSpeed: number
): WeatherData {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    temperature,
    humidity,
    rainfall,
    windSpeed,
    recordedDate: BigInt(Date.now()),
    txHash: '',
  };
}
