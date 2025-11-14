import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCropVariety,
  type CropVariety,
} from '@/lib/onchain-farm-crop-variety-utils';

/**
 * Hook for onchain farm crop variety
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropVariety() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [cropVarieties, setCropVarieties] = useState<CropVariety[]>([]);

  const registerCropVariety = async (
    contractAddress: Address,
    varietyName: string,
    cropType: string,
    characteristics: string,
    yield: bigint,
    resistance: bigint,
    quality: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const variety = createCropVariety(address, varietyName, cropType, characteristics, yield, resistance, quality);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'varietyName', type: 'string' },
            { name: 'cropType', type: 'string' },
            { name: 'characteristics', type: 'string' },
            { name: 'yield', type: 'uint256' },
            { name: 'resistance', type: 'uint256' },
            { name: 'quality', type: 'uint256' }
          ],
          name: 'registerCropVariety',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'registerCropVariety',
      args: [varietyName, cropType, characteristics, yield, resistance, quality],
    });
    
    setCropVarieties([...cropVarieties, variety]);
  };

  const updateCropVariety = async (
    contractAddress: Address,
    varietyId: bigint,
    yield: bigint,
    resistance: bigint,
    quality: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'varietyId', type: 'uint256' },
            { name: 'yield', type: 'uint256' },
            { name: 'resistance', type: 'uint256' },
            { name: 'quality', type: 'uint256' }
          ],
          name: 'updateCropVariety',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'updateCropVariety',
      args: [varietyId, yield, resistance, quality],
    });
  };

  return { 
    cropVarieties, 
    registerCropVariety,
    updateCropVariety,
    address 
  };
}

