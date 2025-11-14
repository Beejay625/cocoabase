import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBehaviorObservation,
  type BehaviorObservation,
} from '@/lib/onchain-farm-livestock-behavior-monitoring-utils';

export function useOnchainFarmLivestockBehaviorMonitoring() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [behaviorObservations, setBehaviorObservations] = useState<BehaviorObservation[]>([]);

  const recordObservation = async (
    contractAddress: Address,
    livestockId: bigint,
    behaviorType: string,
    duration: bigint,
    frequency: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const observation = createBehaviorObservation(
      address,
      livestockId,
      behaviorType,
      duration,
      frequency
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'behaviorType', type: 'string' },
            { name: 'duration', type: 'uint256' },
            { name: 'frequency', type: 'uint256' }
          ],
          name: 'recordBehaviorObservation',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordBehaviorObservation',
      args: [livestockId, behaviorType, duration, frequency],
    });
    
    setBehaviorObservations([...behaviorObservations, observation]);
  };

  return { 
    behaviorObservations, 
    recordObservation, 
    address 
  };
}

