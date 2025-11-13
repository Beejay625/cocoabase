import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWeatherAlert,
  type WeatherAlert,
} from '@/lib/onchain-farm-weather-alert-system-utils';

/**
 * Hook for onchain farm weather alert system
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmWeatherAlertSystem() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  const createAlert = async (
    plantationId: string,
    alertType: string,
    severity: number,
    forecast: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const alert = createWeatherAlert(address, plantationId, alertType, severity, forecast);
    setAlerts([...alerts, alert]);
  };

  const acknowledgeAlert = async (
    contractAddress: Address,
    alertId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'acknowledgeAlert',
      args: [alertId],
    });
  };

  return { alerts, createAlert, acknowledgeAlert, address };
}

