import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFieldMap,
  type FieldMap,
} from '@/lib/onchain-farm-field-mapping-utils';

/**
 * Hook for onchain farm field mapping
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmFieldMapping() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [maps, setMaps] = useState<FieldMap[]>([]);

  const mapField = async (
    fieldId: string,
    coordinates: string,
    area: bigint,
    soilType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const map = createFieldMap(address, fieldId, coordinates, area, soilType);
    setMaps([...maps, map]);
  };

  const updateFieldMap = async (
    contractAddress: Address,
    mapId: string,
    newCoordinates: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateFieldMap',
      args: [mapId, newCoordinates],
    });
  };

  return { maps, mapField, updateFieldMap, address };
}

