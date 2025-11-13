import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createWeatherData,
  type WeatherData,
} from '@/lib/onchain-farm-weather-data-logging-utils';

export function useOnchainFarmWeatherDataLogging() {
  const { address } = useAccount();
  const [data, setData] = useState<WeatherData[]>([]);

  const create = async (
    temperature: number,
    rainfall: number,
    humidity: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const weatherData = createWeatherData(address, temperature, rainfall, humidity);
    setData([...data, weatherData]);
  };

  return { data, create, address };
}
