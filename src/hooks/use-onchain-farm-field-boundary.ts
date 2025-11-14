import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFieldBoundary,
  type FieldBoundary,
} from '@/lib/onchain-farm-field-boundary-utils';

/**
 * Hook for onchain farm field boundary
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmFieldBoundary() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [fieldBoundaries, setFieldBoundaries] = useState<FieldBoundary[]>([]);

  const registerFieldBoundary = async (
    contractAddress: Address,
    location: string,
    coordinates: string,
    area: bigint,
    perimeter: bigint,
    boundaryType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const boundary = createFieldBoundary(address, location, coordinates, area, perimeter, boundaryType);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'location', type: 'string' },
            { name: 'coordinates', type: 'string' },
            { name: 'area', type: 'uint256' },
            { name: 'perimeter', type: 'uint256' },
            { name: 'boundaryType', type: 'string' }
          ],
          name: 'registerFieldBoundary',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'registerFieldBoundary',
      args: [location, coordinates, area, perimeter, boundaryType],
    });
    
    setFieldBoundaries([...fieldBoundaries, boundary]);
  };

  const updateFieldBoundary = async (
    contractAddress: Address,
    boundaryId: bigint,
    coordinates: string,
    area: bigint,
    perimeter: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'boundaryId', type: 'uint256' },
            { name: 'coordinates', type: 'string' },
            { name: 'area', type: 'uint256' },
            { name: 'perimeter', type: 'uint256' }
          ],
          name: 'updateFieldBoundary',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'updateFieldBoundary',
      args: [boundaryId, coordinates, area, perimeter],
    });
  };

  const deactivateFieldBoundary = async (
    contractAddress: Address,
    boundaryId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'boundaryId', type: 'uint256' }],
          name: 'deactivateFieldBoundary',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'deactivateFieldBoundary',
      args: [boundaryId],
    });
  };

  return { 
    fieldBoundaries, 
    registerFieldBoundary,
    updateFieldBoundary,
    deactivateFieldBoundary,
    address 
  };
}

