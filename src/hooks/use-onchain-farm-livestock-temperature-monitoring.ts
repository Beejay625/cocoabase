import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTemperatureReading,
  type TemperatureReading,
} from '@/lib/onchain-farm-livestock-temperature-monitoring-utils';

/**
 * Hook for onchain farm livestock temperature monitoring
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockTemperatureMonitoring() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [readings, setReadings] = useState<TemperatureReading[]>([]);

  const recordTemperature = async (
    animalId: string,
    temperature: number,
    measurementDate: bigint,
    measurementMethod: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const reading = createTemperatureReading(address, animalId, temperature, measurementDate, measurementMethod);
    setReadings([...readings, reading]);
  };

  const verifyReading = async (
    contractAddress: Address,
    readingId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyReading',
      args: [readingId],
    });
  };

  return { readings, recordTemperature, verifyReading, address };
}

