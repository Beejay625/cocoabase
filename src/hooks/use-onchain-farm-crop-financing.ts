import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFinancingApplication as createFinancingApplicationData,
  createRepayment as createRepaymentData,
  type FinancingApplication,
  type Repayment,
} from '@/lib/onchain-farm-crop-financing-utils';

/**
 * Hook for onchain farm crop financing
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropFinancing() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [applications, setApplications] = useState<FinancingApplication[]>([]);
  const [repayments, setRepayments] = useState<Repayment[]>([]);

  const submitApplication = async (
    contractAddress: Address,
    cropId: bigint,
    requestedAmount: bigint,
    termDays: bigint,
    purpose: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const application = createFinancingApplicationData(address, cropId, requestedAmount, BigInt(0), termDays, purpose);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'cropId', type: 'uint256' },
            { name: 'requestedAmount', type: 'uint256' },
            { name: 'termDays', type: 'uint256' },
            { name: 'purpose', type: 'string' }
          ],
          name: 'submitApplication',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'submitApplication',
      args: [cropId, requestedAmount, termDays, purpose],
    });
    
    setApplications([...applications, application]);
  };

  const approveApplication = async (
    contractAddress: Address,
    applicationId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'applicationId', type: 'uint256' }],
          name: 'approveApplication',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'approveApplication',
      args: [applicationId],
    });
  };

  const makeRepayment = async (
    contractAddress: Address,
    applicationId: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const repayment = createRepaymentData(address, applicationId, value);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'applicationId', type: 'uint256' }],
          name: 'makeRepayment',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'makeRepayment',
      args: [applicationId],
      value: value,
    });
    
    setRepayments([...repayments, repayment]);
  };

  return { 
    applications,
    repayments,
    submitApplication,
    approveApplication,
    makeRepayment,
    address 
  };
}

