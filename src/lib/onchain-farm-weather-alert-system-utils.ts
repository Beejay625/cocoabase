import { type Address } from 'viem';

/**
 * Onchain farm weather alert system utilities
 * Weather alert creation and acknowledgment
 */

export interface WeatherAlert {
  id: string;
  plantationId: string;
  createdBy: Address;
  alertType: string;
  severity: number;
  forecast: string;
  acknowledged: boolean;
  timestamp: bigint;
}

export function createWeatherAlert(
  address: Address,
  plantationId: string,
  alertType: string,
  severity: number,
  forecast: string
): WeatherAlert {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    createdBy: address,
    alertType,
    severity,
    forecast,
    acknowledged: false,
    timestamp: BigInt(Date.now()),
  };
}

