import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPollinationEvent,
  type PollinationEvent,
} from '@/lib/onchain-farm-crop-pollination-management-utils';

export function useOnchainFarmCropPollinationManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pollinationEvents, setPollinationEvents] = useState<PollinationEvent[]>([]);

  const recordEvent = async (
    contractAddress: Address,
    plantationId: bigint,
    cropType: string,
    pollinatorType: string,
    pollinatorCount: bigint,
    successRate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const event = createPollinationEvent(
      address,
      plantationId,
      cropType,
      pollinatorType,
      pollinatorCount,
      successRate
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'cropType', type: 'string' },
            { name: 'pollinatorType', type: 'string' },
            { name: 'pollinatorCount', type: 'uint256' },
            { name: 'successRate', type: 'uint256' }
          ],
          name: 'recordPollinationEvent',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordPollinationEvent',
      args: [plantationId, cropType, pollinatorType, pollinatorCount, successRate],
    });
    
    setPollinationEvents([...pollinationEvents, event]);
  };

  const createPlan = async (
    contractAddress: Address,
    plantationId: bigint,
    cropType: string,
    requiredPollinators: bigint,
    scheduledDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'cropType', type: 'string' },
            { name: 'requiredPollinators', type: 'uint256' },
            { name: 'scheduledDate', type: 'uint256' }
          ],
          name: 'createPollinationPlan',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createPollinationPlan',
      args: [plantationId, cropType, requiredPollinators, scheduledDate],
    });
  };

  return { 
    pollinationEvents, 
    recordEvent, 
    createPlan, 
    address 
  };
}


