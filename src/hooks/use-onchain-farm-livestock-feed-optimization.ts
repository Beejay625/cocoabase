import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeedRation,
  type FeedRation,
} from '@/lib/onchain-farm-livestock-feed-optimization-utils';

/**
 * Hook for onchain livestock feed optimization
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockFeedOptimization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [feedRations, setFeedRations] = useState<FeedRation[]>([]);

  const createRation = async (
    contractAddress: Address,
    livestockId: bigint,
    livestockType: string,
    proteinContent: bigint,
    carbohydrateContent: bigint,
    fatContent: bigint,
    fiberContent: bigint,
    dailyAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const ration = createFeedRation(
      address,
      livestockId,
      livestockType,
      proteinContent,
      carbohydrateContent,
      fatContent,
      fiberContent,
      dailyAmount
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'livestockType', type: 'string' },
            { name: 'proteinContent', type: 'uint256' },
            { name: 'carbohydrateContent', type: 'uint256' },
            { name: 'fatContent', type: 'uint256' },
            { name: 'fiberContent', type: 'uint256' },
            { name: 'dailyAmount', type: 'uint256' }
          ],
          name: 'createFeedRation',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createFeedRation',
      args: [livestockId, livestockType, proteinContent, carbohydrateContent, fatContent, fiberContent, dailyAmount],
    });
    
    setFeedRations([...feedRations, ration]);
  };

  const optimizeRation = async (
    contractAddress: Address,
    rationId: bigint,
    efficiencyScore: bigint,
    costSavings: bigint,
    nutritionalBalance: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'rationId', type: 'uint256' },
            { name: 'efficiencyScore', type: 'uint256' },
            { name: 'costSavings', type: 'uint256' },
            { name: 'nutritionalBalance', type: 'uint256' }
          ],
          name: 'optimizeRation',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'optimizeRation',
      args: [rationId, efficiencyScore, costSavings, nutritionalBalance],
    });
  };

  return { 
    feedRations, 
    createRation, 
    optimizeRation, 
    address 
  };
}


