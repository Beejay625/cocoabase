import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSuccessionPlan,
  type SuccessionPlan,
} from '@/lib/onchain-farm-succession-planning-utils';

/**
 * Hook for onchain farm succession planning
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSuccessionPlanning() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [plans, setPlans] = useState<SuccessionPlan[]>([]);

  const createSuccessionPlan = async (
    contractAddress: Address,
    successor: Address,
    transferDate: bigint,
    planDetails: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'successor', type: 'address' },
            { name: 'transferDate', type: 'uint256' },
            { name: 'planDetails', type: 'string' }
          ],
          name: 'createSuccessionPlan',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createSuccessionPlan',
      args: [successor, transferDate, planDetails],
    });
  };

  const approvePlan = async (
    contractAddress: Address,
    planId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'planId', type: 'uint256' }],
          name: 'approvePlan',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'approvePlan',
      args: [planId],
    });
  };

  return { 
    plans, 
    createSuccessionPlan, 
    approvePlan, 
    address 
  };
}
