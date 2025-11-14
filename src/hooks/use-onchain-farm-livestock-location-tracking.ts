import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLocationRecord,
  type LocationRecord,
} from '@/lib/onchain-farm-livestock-location-tracking-utils';

/**
 * Hook for onchain farm livestock location tracking
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockLocationTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<LocationRecord[]>([]);

  const recordLocation = async (
    animalId: string,
    latitude: number,
    longitude: number,
    locationDate: bigint,
    locationType: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createLocationRecord(address, animalId, latitude, longitude, locationDate, locationType);
    setRecords([...records, record]);
  };

  const updateLocation = async (
    contractAddress: Address,
    recordId: string,
    newLatitude: number,
    newLongitude: number
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateLocation',
      args: [recordId, newLatitude, newLongitude],
    });
  };

  return { records, recordLocation, updateLocation, address };
}

