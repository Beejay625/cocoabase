import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createWeatherDerivative,
  type WeatherDerivative,
} from '@/lib/onchain-weather-derivatives-utils';

export function useOnchainWeatherDerivatives() {
  const { address } = useAccount();
  const [derivatives, setDerivatives] = useState<WeatherDerivative[]>([]);

  const createDerivative = async (
    plantationId: bigint,
    weatherType: WeatherDerivative['weatherType'],
    threshold: bigint,
    payout: bigint,
    expiresAt: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const derivative = createWeatherDerivative(
      address,
      plantationId,
      weatherType,
      threshold,
      payout,
      expiresAt
    );
    setDerivatives([...derivatives, derivative]);
  };

  return { derivatives, createDerivative, address };
}
