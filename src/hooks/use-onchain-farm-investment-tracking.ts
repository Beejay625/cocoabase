import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createInvestment,
  type Investment,
} from '@/lib/onchain-farm-investment-tracking-utils';

/**
 * Hook for onchain farm investment tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmInvestmentTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [investments, setInvestments] = useState<Investment[]>([]);

  const recordInvestment = async (
    contractAddress: Address,
    amount: bigint,
    investmentType: string,
    expectedReturn: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'amount', type: 'uint256' },
            { name: 'investmentType', type: 'string' },
            { name: 'expectedReturn', type: 'uint256' }
          ],
          name: 'recordInvestment',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordInvestment',
      args: [amount, investmentType, expectedReturn],
    });
  };

  const recordReturn = async (
    contractAddress: Address,
    investmentId: bigint,
    actualReturn: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'investmentId', type: 'uint256' },
            { name: 'actualReturn', type: 'uint256' }
          ],
          name: 'recordReturn',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordReturn',
      args: [investmentId, actualReturn],
    });
  };

  return { 
    investments, 
    recordInvestment, 
    recordReturn, 
    address 
  };
}
