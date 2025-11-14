import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSustainabilityAction,
  type SustainabilityAction,
} from '@/lib/onchain-farm-sustainability-rewards-utils';

export function useOnchainFarmSustainabilityRewards() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [actions, setActions] = useState<SustainabilityAction[]>([]);

  const recordAction = async (
    contractAddress: Address,
    plantationId: bigint,
    actionType: string,
    points: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const action = createSustainabilityAction(address, plantationId, actionType, points);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'actionType', type: 'string' },
            { name: 'points', type: 'uint256' }
          ],
          name: 'recordAction',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordAction',
      args: [plantationId, actionType, points],
    });
    
    setActions([...actions, action]);
  };

  const claimReward = async (
    contractAddress: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [],
          name: 'claimReward',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'claimReward',
      args: [],
    });
  };

  return { actions, recordAction, claimReward, address };
}
