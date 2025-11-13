import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';

/**
 * Hook for onchain farm budget planning
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmBudgetPlanning() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [budgets, setBudgets] = useState<any[]>([]);

  const createBudget = async (
    contractAddress: Address,
    totalAmount: bigint,
    periodStart: bigint,
    periodEnd: bigint,
    budgetName: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'totalAmount', type: 'uint256' },
            { name: 'periodStart', type: 'uint256' },
            { name: 'periodEnd', type: 'uint256' },
            { name: 'budgetName', type: 'string' }
          ],
          name: 'createBudget',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createBudget',
      args: [totalAmount, periodStart, periodEnd, budgetName],
    });
  };

  const recordExpense = async (
    contractAddress: Address,
    budgetId: bigint,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'budgetId', type: 'uint256' },
            { name: 'amount', type: 'uint256' }
          ],
          name: 'recordExpense',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordExpense',
      args: [budgetId, amount],
    });
  };

  return { 
    budgets, 
    createBudget, 
    recordExpense, 
    address 
  };
}
