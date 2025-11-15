import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOptimizationPlan,
  type OptimizationPlan,
} from '@/lib/onchain-farm-crop-yield-optimization-utils';

/**
 * Hook for onchain crop yield optimization
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropYieldOptimization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [optimizationPlans, setOptimizationPlans] = useState<OptimizationPlan[]>([]);

  const createPlan = async (
    contractAddress: Address,
    plantationId: bigint,
    cropType: string,
    targetYield: bigint,
    currentYield: bigint,
    recommendations: string[]
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const plan = createOptimizationPlan(
      address,
      plantationId,
      cropType,
      targetYield,
      currentYield,
      recommendations
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'cropType', type: 'string' },
            { name: 'targetYield', type: 'uint256' },
            { name: 'currentYield', type: 'uint256' },
            { name: 'recommendations', type: 'string[]' }
          ],
          name: 'createOptimizationPlan',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createOptimizationPlan',
      args: [plantationId, cropType, targetYield, currentYield, recommendations],
    });
    
    setOptimizationPlans([...optimizationPlans, plan]);
  };

  const recordYieldImprovement = async (
    contractAddress: Address,
    planId: bigint,
    afterYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'planId', type: 'uint256' },
            { name: 'afterYield', type: 'uint256' }
          ],
          name: 'recordYieldImprovement',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordYieldImprovement',
      args: [planId, afterYield],
    });
  };

  return { 
    optimizationPlans, 
    createPlan, 
    recordYieldImprovement, 
    address 
  };
}


