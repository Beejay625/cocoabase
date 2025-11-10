import { type Address } from 'viem';

/**
 * Onchain Weather-Based Irrigation Automation utilities
 * Automate irrigation based on weather data onchain with Reown wallet integration
 */

export interface IrrigationAutomation {
  id: bigint;
  farmer: Address;
  fieldId: string;
  weatherThreshold: number;
  soilMoistureThreshold: number;
  irrigationAmount: bigint;
  automationEnabled: boolean;
  lastIrrigation: bigint;
  nextScheduled: bigint;
  status: 'active' | 'paused' | 'disabled';
}

export function createIrrigationAutomation(
  farmer: Address,
  fieldId: string,
  weatherThreshold: number,
  soilMoistureThreshold: number,
  irrigationAmount: bigint
): IrrigationAutomation {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    farmer,
    fieldId,
    weatherThreshold,
    soilMoistureThreshold,
    irrigationAmount,
    automationEnabled: true,
    lastIrrigation: now,
    nextScheduled: now + BigInt(86400000),
    status: 'active',
  };
}

export function triggerIrrigation(automation: IrrigationAutomation): IrrigationAutomation {
  const now = BigInt(Date.now());
  return {
    ...automation,
    lastIrrigation: now,
    nextScheduled: now + BigInt(86400000),
  };
}

export function shouldIrrigate(
  automation: IrrigationAutomation,
  currentRainfall: number,
  currentMoisture: number,
  currentTime: bigint
): boolean {
  if (!automation.automationEnabled || automation.status !== 'active') return false;
  if (currentTime < automation.nextScheduled) return false;
  if (currentRainfall > automation.weatherThreshold) return false;
  return currentMoisture < automation.soilMoistureThreshold;
}

