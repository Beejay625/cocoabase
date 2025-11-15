import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCostAnalysis,
  type CostAnalysis,
} from '@/lib/onchain-farm-livestock-feed-cost-optimization-utils';

export function useOnchainFarmLivestockFeedCostOptimization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [analyses, setAnalyses] = useState<CostAnalysis[]>([]);

  const createAnalysis = async (
    contractAddress: Address,
    livestockId: bigint,
    currentCost: bigint,
    optimizedCost: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const analysis = createCostAnalysis(
      address,
      livestockId,
      currentCost,
      optimizedCost
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'currentCost', type: 'uint256' },
            { name: 'optimizedCost', type: 'uint256' }
          ],
          name: 'createAnalysis',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createAnalysis',
      args: [livestockId, currentCost, optimizedCost],
    });
    
    setAnalyses([...analyses, analysis]);
  };

  return { 
    analyses, 
    createAnalysis, 
    address 
  };
}


