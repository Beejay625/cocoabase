import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMoistureReading,
  type MoistureReading,
} from '@/lib/onchain-farm-soil-moisture-sensing-utils';

/**
 * Hook for onchain farm soil moisture sensing
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSoilMoistureSensing() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [readings, setReadings] = useState<MoistureReading[]>([]);

  const recordMoisture = async (
    plantationId: string,
    moistureLevel: number,
    depth: number,
    sensorLocation: string,
    readingDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const reading = createMoistureReading(address, plantationId, moistureLevel, depth, sensorLocation, readingDate);
    setReadings([...readings, reading]);
  };

  const verifyReading = async (
    contractAddress: Address,
    readingId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyReading',
      args: [readingId],
    });
  };

  return { readings, recordMoisture, verifyReading, address };
}

