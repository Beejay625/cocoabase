import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createRotationPlan,
  createRotationHistory,
  type RotationPlan,
  type RotationHistory,
} from '@/lib/onchain-farm-crop-rotation-utils';

/**
 * Hook for onchain farm crop rotation
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropRotation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [rotationPlans, setRotationPlans] = useState<RotationPlan[]>([]);
  const [rotationHistory, setRotationHistory] = useState<RotationHistory[]>([]);

  const createRotationPlan = async (
    contractAddress: Address,
    fieldId: bigint,
    currentCrop: string,
    nextCrop: string,
    rotationDate: bigint,
    cycleLength: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const plan = createRotationPlan(address, fieldId, currentCrop, nextCrop, rotationDate, cycleLength);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'fieldId', type: 'uint256' },
            { name: 'currentCrop', type: 'string' },
            { name: 'nextCrop', type: 'string' },
            { name: 'rotationDate', type: 'uint256' },
            { name: 'cycleLength', type: 'uint256' }
          ],
          name: 'createRotationPlan',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createRotationPlan',
      args: [fieldId, currentCrop, nextCrop, rotationDate, cycleLength],
    });
    
    setRotationPlans([...rotationPlans, plan]);
  };

  const executeRotation = async (
    contractAddress: Address,
    planId: bigint,
    crop: string,
    plantingDate: bigint,
    yield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const history = createRotationHistory(planId, crop, plantingDate, yield);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'planId', type: 'uint256' },
            { name: 'crop', type: 'string' },
            { name: 'plantingDate', type: 'uint256' },
            { name: 'yield', type: 'uint256' }
          ],
          name: 'executeRotation',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'executeRotation',
      args: [planId, crop, plantingDate, yield],
    });
    
    setRotationHistory([...rotationHistory, history]);
  };

  const completeRotation = async (
    contractAddress: Address,
    planId: bigint,
    historyId: bigint,
    harvestDate: bigint,
    yield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'planId', type: 'uint256' },
            { name: 'historyId', type: 'uint256' },
            { name: 'harvestDate', type: 'uint256' },
            { name: 'yield', type: 'uint256' }
          ],
          name: 'completeRotation',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeRotation',
      args: [planId, historyId, harvestDate, yield],
    });
  };

  return { 
    rotationPlans,
    rotationHistory,
    createRotationPlan, 
    executeRotation,
    completeRotation,
    address 
  };
}

