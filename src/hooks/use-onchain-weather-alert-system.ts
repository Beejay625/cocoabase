import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createWeatherAlert,
  type WeatherAlert,
} from '@/lib/onchain-weather-alert-system-utils';

export function useOnchainWeatherAlertSystem() {
  const { address } = useAccount();
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  const createAlert = async (
    plantationId: bigint,
    alertType: WeatherAlert['alertType'],
    severity: WeatherAlert['severity'],
    alertDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const alert = createWeatherAlert(address, plantationId, alertType, severity, alertDate);
    setAlerts([...alerts, alert]);
  };

  return { alerts, createAlert, address };
}
