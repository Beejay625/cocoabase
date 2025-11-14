import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createGrowthStage,
  type GrowthStage,
} from '@/lib/onchain-farm-crop-growth-stage-tracking-utils';

export function useOnchainFarmCropGrowthStageTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [growthStages, setGrowthStages] = useState<GrowthStage[]>([]);

  const recordStage = async (
    contractAddress: Address,
    plantationId: bigint,
    cropType: string,
    stageName: string,
    stageNumber: bigint,
    expectedEndDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const stage = createGrowthStage(
      address,
      plantationId,
      cropType,
      stageName,
      stageNumber,
      expectedEndDate
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'cropType', type: 'string' },
            { name: 'stageName', type: 'string' },
            { name: 'stageNumber', type: 'uint256' },
            { name: 'expectedEndDate', type: 'uint256' }
          ],
          name: 'recordGrowthStage',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordGrowthStage',
      args: [plantationId, cropType, stageName, stageNumber, expectedEndDate],
    });
    
    setGrowthStages([...growthStages, stage]);
  };

  const transitionStage = async (
    contractAddress: Address,
    fromStageId: bigint,
    toStageId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'fromStageId', type: 'uint256' },
            { name: 'toStageId', type: 'uint256' }
          ],
          name: 'transitionStage',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'transitionStage',
      args: [fromStageId, toStageId],
    });
  };

  return { 
    growthStages, 
    recordStage, 
    transitionStage, 
    address 
  };
}

