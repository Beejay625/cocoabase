import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAdaptationStrategy,
  type AdaptationStrategy,
} from '@/lib/onchain-farm-crop-climate-adaptation-utils';

export function useOnchainFarmCropClimateAdaptation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [strategies, setStrategies] = useState<AdaptationStrategy[]>([]);

  const createStrategy = async (
    contractAddress: Address,
    plantationId: bigint,
    cropType: string,
    strategyType: string,
    effectivenessScore: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const strategy = createAdaptationStrategy(
      address,
      plantationId,
      cropType,
      strategyType,
      effectivenessScore
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'cropType', type: 'string' },
            { name: 'strategyType', type: 'string' },
            { name: 'effectivenessScore', type: 'uint256' }
          ],
          name: 'createStrategy',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createStrategy',
      args: [plantationId, cropType, strategyType, effectivenessScore],
    });
    
    setStrategies([...strategies, strategy]);
  };

  return { 
    strategies, 
    createStrategy, 
    address 
  };
}


