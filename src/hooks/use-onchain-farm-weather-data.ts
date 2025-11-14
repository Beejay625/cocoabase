import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWeatherRecord,
  type WeatherRecord,
} from '@/lib/onchain-farm-weather-data-utils';

/**
 * Hook for onchain farm weather data
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmWeatherData() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [weatherRecords, setWeatherRecords] = useState<WeatherRecord[]>([]);

  const recordWeatherData = async (
    contractAddress: Address,
    location: string,
    temperature: bigint,
    humidity: bigint,
    rainfall: bigint,
    windSpeed: bigint,
    conditions: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createWeatherRecord(address, location, temperature, humidity, rainfall, windSpeed, conditions);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'location', type: 'string' },
            { name: 'temperature', type: 'int256' },
            { name: 'humidity', type: 'uint256' },
            { name: 'rainfall', type: 'uint256' },
            { name: 'windSpeed', type: 'uint256' },
            { name: 'conditions', type: 'string' }
          ],
          name: 'recordWeatherData',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordWeatherData',
      args: [location, temperature, humidity, rainfall, windSpeed, conditions],
    });
    
    setWeatherRecords([...weatherRecords, record]);
  };

  return { 
    weatherRecords, 
    recordWeatherData,
    address 
  };
}

