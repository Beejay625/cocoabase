import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFinancialPlan,
  type FinancialPlan,
} from '@/lib/onchain-farm-financial-planning-utils';

/**
 * Hook for onchain farm financial planning
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmFinancialPlanning() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [plans, setPlans] = useState<FinancialPlan[]>([]);

  const createPlan = async (
    contractAddress: Address,
    totalBudget: bigint,
    startDate: bigint,
    endDate: bigint,
    planType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'totalBudget', type: 'uint256' },
            { name: 'startDate', type: 'uint256' },
            { name: 'endDate', type: 'uint256' },
            { name: 'planType', type: 'string' }
          ],
          name: 'createPlan',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createPlan',
      args: [totalBudget, startDate, endDate, planType],
    });
  };

  const addBudgetItem = async (
    contractAddress: Address,
    planId: bigint,
    category: string,
    allocated: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'planId', type: 'uint256' },
            { name: 'category', type: 'string' },
            { name: 'allocated', type: 'uint256' }
          ],
          name: 'addBudgetItem',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'addBudgetItem',
      args: [planId, category, allocated],
    });
  };

  return { 
    plans, 
    createPlan, 
    addBudgetItem, 
    address 
  };
}
